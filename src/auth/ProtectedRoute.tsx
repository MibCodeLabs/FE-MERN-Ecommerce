import { Navigate, Outlet } from "react-router-dom";
import type { AccountType } from "../types/AccountType";
import { ACCOUNT_TYPES } from "../constants/constants";


interface ProtectedRouteProps {
  accountType: AccountType;
}


export default function ProtectedRoute({
  accountType,
}: ProtectedRouteProps) {

  const token = localStorage.getItem("token");

  let URL = "/login";

  if (accountType === ACCOUNT_TYPES.SHOP) {
    URL = "/shop/login";
  }

  if (accountType === ACCOUNT_TYPES.STAFF) {
    URL = "/staff/login";
  }

  if (accountType === ACCOUNT_TYPES.CUSTOMER) {
    URL = "/login";
  }


  if (!token) {
    return <Navigate to={URL} replace />;
  }


  return <Outlet />;
}
