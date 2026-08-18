import { Navigate, Outlet } from "react-router-dom";
import type { AccountType } from "../../types/AccountType";
import { ACCOUNT_TYPES } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import { tokenStorage } from "../../persistence/tokenStorage";
import { getAccountIncompleteStatusFromToken } from "../../utils/jwt";

const PROFILE_COMPLETION_ROUTES: Record<AccountType, string> = {
  [ACCOUNT_TYPES.CUSTOMER]: "/customer-profile-completion",
  [ACCOUNT_TYPES.SHOP]: "/shop/shop-profile-completion",
  [ACCOUNT_TYPES.STAFF]: "/staff/staff-profile-completion",
};

export default function ProfileCompletionGuard() {
  let token = tokenStorage.getAccessToken();
  const { accountType } = useAuth();
  if (token && accountType) {
    if (getAccountIncompleteStatusFromToken(token)) {
      return <Navigate to={PROFILE_COMPLETION_ROUTES[accountType]} replace />;
    }
  }

  return <Outlet />;
}
