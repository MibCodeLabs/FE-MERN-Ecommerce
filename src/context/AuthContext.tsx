import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { tokenStorage } from "../auth/tokenStorage";
import type { AccountType } from "../types/AccountType";
import { getAccountTypeFromToken } from "../utils/jwt";

interface AuthContextType {
  isAuthenticated: boolean;
  accountType: AccountType | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const token = tokenStorage.getAccessToken();

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const [accountType, setAccountType] = useState<AccountType | null>(
    token ? getAccountTypeFromToken(token) : null,
  );

  const login = useCallback((accessToken: string) => {
    tokenStorage.saveAccessToken(accessToken);

    setAccountType(getAccountTypeFromToken(accessToken));
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.removeAccessToken();

    setAccountType(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      accountType,
      login,
      logout,
    }),
    [isAuthenticated, accountType, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
