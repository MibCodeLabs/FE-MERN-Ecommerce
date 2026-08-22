let accessToken: string | null = null;
let onTokenChange: ((token: string | null) => void) | null = null;

export const accessTokenManager = {
  getToken() {
    return accessToken;
  },

  setToken(token: string | null) {
    accessToken = token;
    onTokenChange?.(token);
  },

  subscribe(callback: (token: string | null) => void) {
    onTokenChange = callback;

    return () => {
      onTokenChange = null;
    };
  },
};
