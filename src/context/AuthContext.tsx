import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { tokenStorage } from "../persistence/tokenStorage";
import type { AccountType } from "../types/AccountType";
import { getAccountTypeFromToken } from "../utils/jwt";

interface AuthContextType {
  isAuthenticated: boolean;
  accountType: AccountType | null;
  persistAuth: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const token = tokenStorage.getAccessToken();

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const [accountType, setAccountType] = useState<AccountType | null>(
    token ? getAccountTypeFromToken(token) : null,
  );

  const persistAuth = useCallback(
    (accessToken: string, refreshToken: string) => {
      tokenStorage.saveTokens(accessToken, refreshToken);

      setAccountType(getAccountTypeFromToken(accessToken));
      setIsAuthenticated(true);
    },
    [],
  );

  const clearAuth = useCallback(() => {
    tokenStorage.removeTokens();

    setAccountType(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      accountType,
      persistAuth,
      clearAuth,
    }),
    [isAuthenticated, accountType, persistAuth, clearAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
