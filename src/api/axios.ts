import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { BASE_URL } from "../constants/constants";
import type { AuthResponse } from "../api-schema/auth/authResponseSchema";
import { accessTokenManager } from "../services/accessTokenManager";

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = accessTokenManager.getToken();

  if (!accessToken) {
    return Promise.reject(new Error("AUTHENTICATION_REQUIRED"));
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const response = await publicApi.post<AuthResponse>(
    "auth/token/refresh",
    {},
    {
      withCredentials: true,
    },
  );

  const { accessToken } = response.data;

  accessTokenManager.setToken(accessToken);

  return accessToken;
}

// Handle expired access tokens.
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
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
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      accessTokenManager.setToken(null);
      return Promise.reject(refreshError);
    }
  },
);
