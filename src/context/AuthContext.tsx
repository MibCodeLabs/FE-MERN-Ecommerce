import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { tokenStorage } from "../auth/tokenStorage";

interface AuthContextType {
  isAuthenticated: boolean;

  login: (accessToken: string) => void;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!tokenStorage.getAccessToken(),
  );

  const login = useCallback((accessToken: string) => {
    tokenStorage.saveAccessToken(accessToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.removeAccessToken();
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, login, logout],
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
