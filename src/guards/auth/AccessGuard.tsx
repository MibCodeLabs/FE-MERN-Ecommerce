import { Navigate, Outlet } from "react-router-dom";
import type { AccountType } from "../../types/AccountType";
import { ACCOUNT_TYPES } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";

interface AccessGuardProps {
  accountType: AccountType;
  allowGuest?: boolean;
}

const LOGIN_ROUTES: Record<AccountType, string> = {
  [ACCOUNT_TYPES.CUSTOMER]: "/login",
  [ACCOUNT_TYPES.SHOP]: "/shop/login",
  [ACCOUNT_TYPES.STAFF]: "/staff/login",
};

const HOME_ROUTES: Record<AccountType, string> = {
  [ACCOUNT_TYPES.CUSTOMER]: "/",
  [ACCOUNT_TYPES.SHOP]: "/shop",
  [ACCOUNT_TYPES.STAFF]: "/staff",
};

export default function AccessGuard({
  accountType,
  allowGuest = false,
}: AccessGuardProps) {
  const { isAuthenticated, accountType: loggedInAccountType } = useAuth();

  if (!isAuthenticated && allowGuest) {
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_ROUTES[accountType]} replace />;
  }

  if (!loggedInAccountType) {
    return <Navigate to="/login" replace />;
  }

  if (loggedInAccountType !== accountType) {
    return <Navigate to={HOME_ROUTES[loggedInAccountType]} replace />;
  }

  return <Outlet />;
}
