import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { AccountType } from "../types/AccountType";
import { ACCOUNT_TYPES } from "../constants/constants";

interface GuestRouteProps {
  accountType: AccountType;
}

const DASHBOARD_ROUTES: Record<AccountType, string> = {
  [ACCOUNT_TYPES.STAFF]: "/staff",
  [ACCOUNT_TYPES.SHOP]: "/shop",
  [ACCOUNT_TYPES.CUSTOMER]: "/",
};

export default function GuestRoute({
  accountType,
}: GuestRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to={DASHBOARD_ROUTES[accountType]}
        replace
      />
    );
  }

  return <Outlet />;
}