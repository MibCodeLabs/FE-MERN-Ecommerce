import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { tokenStorage } from "../../persistence/tokenStorage";
import { getAccountIncompleteStatusFromToken } from "../../utils/jwt";

export default function ProfileIncompleteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  let token = tokenStorage.getAccessToken();
  const { accountType } = useAuth();

  if (token && accountType) {
    if (!getAccountIncompleteStatusFromToken(token)) {
      return <Navigate to={"/"} replace />;
    }
  }

  return <>{children}</>;
}
