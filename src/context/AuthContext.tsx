import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AccountType } from "../types/AccountType";
import { getAccountTypeFromToken } from "../utils/jwt";
import { accessTokenManager } from "../services/accessTokenManager";
import { authApi } from "../api/authApi";
import { useUI } from "./UIContext";

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  accountType: AccountType | null;
  persistAuth: (accessToken: string) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { showLoading, hideLoading } = useUI();
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const persistAuth = useCallback((token: string) => {
    accessTokenManager.setToken(token);
  }, []);

  const clearAuth = useCallback(() => {
    accessTokenManager.setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      isAuthenticated,
      isAuthLoading,
      accountType,
      persistAuth,
      clearAuth,
    }),
    [
      accessToken,
      isAuthenticated,
      isAuthLoading,
      accountType,
      persistAuth,
      clearAuth,
    ],
  );

  useEffect(() => {
    return accessTokenManager.subscribe((token) => {
      setAccessToken(token);

      if (token) {
        setAccountType(getAccountTypeFromToken(token));
        setIsAuthenticated(true);
      } else {
        setAccountType(null);
        setIsAuthenticated(false);
      }
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function restoreAuth() {
      showLoading("Checking authentication...");

      try {
        const response = await authApi.refresh();
        accessTokenManager.setToken(response.accessToken);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        accessTokenManager.setToken(null);
      } finally {
        if (!controller.signal.aborted) {

          setIsAuthLoading(false);
          hideLoading();
        }
      }
    }

    restoreAuth();

    return () => {
      controller.abort();
    };
  }, [showLoading, hideLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
