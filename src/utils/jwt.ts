import { jwtDecode } from "jwt-decode";
import type { AccountType } from "../types/AccountType";

interface JwtPayload {
  sub: string;
  type: AccountType;
  exp: number;
}

export function getAccountTypeFromToken(
  token: string
): AccountType | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return decoded.type;
  } catch {
    return null;
  }
}