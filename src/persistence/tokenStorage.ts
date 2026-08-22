import { ACCESS_TOKEN_KEY } from "../constants/constants";

export const tokenStorage = {
  saveAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  removeTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  saveTokens(accessToken: string) {
    tokenStorage.saveAccessToken(accessToken);
  },
};