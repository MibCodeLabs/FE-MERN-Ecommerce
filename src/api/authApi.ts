import { api } from "./axios";
import { ACCOUNT_TYPES } from "../constants/constants";
import type { AccountType } from "../types/AccountType";
import type { LoginResponse } from "../types/LoginResponse";

const LOGIN_ENDPOINTS: Record<AccountType, string> = {
  [ACCOUNT_TYPES.STAFF]: "auth/staff/login",
  [ACCOUNT_TYPES.SHOP]: "auth/shop/login",
  [ACCOUNT_TYPES.CUSTOMER]: "auth/customer/login",
};

export async function login(
  accountType: AccountType,
  email: string,
  password: string
): Promise<LoginResponse> {

  const response = await api.post<LoginResponse>(
    LOGIN_ENDPOINTS[accountType],
    {
      email,
      password,
    }
  );

  return response.data;
}