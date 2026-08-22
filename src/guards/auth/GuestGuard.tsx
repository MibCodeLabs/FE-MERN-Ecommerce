import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ACCOUNT_TYPES } from "../../constants/constants";
import type { AccountType } from "../../types/AccountType";

const DASHBOARD_ROUTES: Record<AccountType, string> = {
  [ACCOUNT_TYPES.STAFF]: "/staff",
  [ACCOUNT_TYPES.SHOP]: "/shop",
  [ACCOUNT_TYPES.CUSTOMER]: "/",
};

export default function GuestGuard() {
  const {
    isAuthenticated,
    accountType,
    isAuthLoading,
  } = useAuth();

  if (isAuthLoading) {
    return null;
  }

  if (isAuthenticated && accountType) {
    return (
      <Navigate
        to={DASHBOARD_ROUTES[accountType]}
        replace
      />
    );
  }

  return <Outlet />;
}
