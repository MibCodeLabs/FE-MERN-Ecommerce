import { api } from "./axios";
import { ACCOUNT_TYPES } from "../constants/constants";
import type { AccountType } from "../types/AccountType";
import type { AuthResponse } from "../types/AuthResponse";

const LOGIN_ENDPOINTS: Record<AccountType, string> = {
  [ACCOUNT_TYPES.STAFF]: "auth/staff/login",
  [ACCOUNT_TYPES.SHOP]: "auth/shop/login",
  [ACCOUNT_TYPES.CUSTOMER]: "auth/customer/login",
};

type RegisterableAccountType =
  | typeof ACCOUNT_TYPES.SHOP
  | typeof ACCOUNT_TYPES.CUSTOMER;

const REGISTER_ENDPOINTS: Record<RegisterableAccountType, string> = {
  [ACCOUNT_TYPES.SHOP]: "auth/shop/register",
  [ACCOUNT_TYPES.CUSTOMER]: "auth/customer/register",
};

export const authApi = {
  async login(
    accountType: AccountType,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      LOGIN_ENDPOINTS[accountType],
      {
        email,
        password,
      },
    );

    return response.data;
  },

  async register(
    accountType: AccountType,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    if (accountType === ACCOUNT_TYPES.STAFF) {
      throw new Error("Staff cannot Register");
    }
    const response = await api.post<AuthResponse>(
      REGISTER_ENDPOINTS[accountType],
      {
        email,
        password,
      },
    );

    return response.data;
  },
};
