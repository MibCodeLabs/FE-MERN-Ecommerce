import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { BASE_URL } from "../constants/constants";
import { tokenStorage } from "../persistence/tokenStorage";
import type { AuthResponse } from "../api-schema/auth/authResponseSchema";

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();

  if (!accessToken) {
    return Promise.reject(
      new Error("AUTHENTICATION_REQUIRED"),
    );
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await publicApi.post<AuthResponse>(
    "auth/refresh",
    {
      refreshToken: refreshToken,
    },
  );

  const { accessToken, refreshToken: newRefreshToken } =
    response.data;

  tokenStorage.saveTokens(
    accessToken,
    newRefreshToken,
  );

  return accessToken;
}

// Handle expired access tokens.
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | InternalAxiosRequestConfig & { _retry?: boolean }
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
        refreshPromise.finally(() => {
          refreshPromise = null;
        });
      }
      const newAccessToken = await refreshPromise;
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      tokenStorage.removeTokens();
      return Promise.reject(refreshError);
    }
  },
);