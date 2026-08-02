import { login } from "../api/authApi";
import type { AccountType } from "../types/AccountType";

export async function handleLogin(
  accountType: AccountType,
  email: string,
  password: string
) {
  return login(accountType, email, password);
}