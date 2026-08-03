import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ACCOUNT_TYPES } from "../constants/constants";
import type { AccountType } from "../types/AccountType";

const DASHBOARD_ROUTES: Record<AccountType, string> = {
  [ACCOUNT_TYPES.STAFF]: "/staff",
  [ACCOUNT_TYPES.SHOP]: "/shop",
  [ACCOUNT_TYPES.CUSTOMER]: "/",
};

export default function GuestRoute() {
  const { isAuthenticated, accountType } = useAuth();

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