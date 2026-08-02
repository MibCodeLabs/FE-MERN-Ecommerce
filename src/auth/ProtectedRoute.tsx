import { Navigate, Outlet } from "react-router-dom";
import type { AccountType } from "../types/AccountType";
import { ACCOUNT_TYPES } from "../constants/constants";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  accountType: AccountType;
}

const LOGIN_ROUTES: Record<AccountType, string> = {
  [ACCOUNT_TYPES.CUSTOMER]: "/login",
  [ACCOUNT_TYPES.SHOP]: "/shop/login",
  [ACCOUNT_TYPES.STAFF]: "/staff/login",
};

export default function ProtectedRoute({ accountType }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_ROUTES[accountType]} replace />;
  }

  return <Outlet />;
}
