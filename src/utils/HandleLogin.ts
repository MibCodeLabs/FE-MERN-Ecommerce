import { ACCOUNT_TYPES } from "../constants/constants";
import type { AccountType } from "../types/AccountType";

export function handleLogin(
  accountType: AccountType,
  email: string,
  password: string
) {

  console.log(email,password)
  if(accountType === ACCOUNT_TYPES.STAFF){
    // staff login flow
  }

  if(accountType === ACCOUNT_TYPES.SHOP){
    // shop login flow
  }

  if(accountType === ACCOUNT_TYPES.CUSTOMER){
    // customer login flow
  }

//   general flow

}
