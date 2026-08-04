import { ACCESS_TOKEN_KEY, REFERSH_TOKEN_KEY } from "../constants/constants";

export const tokenStorage = {
  saveAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  saveRefreshToken(token: string) {
    localStorage.setItem(REFERSH_TOKEN_KEY, token);
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFERSH_TOKEN_KEY);
  },

  removeTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFERSH_TOKEN_KEY);
  },

  saveTokens(accessToken:string,refreshToken:string){
    tokenStorage.saveAccessToken(accessToken);
    tokenStorage.saveRefreshToken(refreshToken)
    
  }
};