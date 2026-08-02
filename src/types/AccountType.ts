import type { ACCOUNT_TYPES } from "../constants/constants";

export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];