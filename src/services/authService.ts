import type { ProfileForm } from "../api-schema/customer/customerProfileSchema";
import type { ShopProfileForm } from "../api-schema/shop/shopProfileSchema";
import { authApi } from "../api/authApi";
import type { AccountType } from "../types/AccountType";

export const authService = {
  async handleLogin(accountType: AccountType, email: string, password: string) {
    return authApi.login(accountType, email, password);
  },

  async handleRegister(
    accountType: AccountType,
    email: string,
    password: string,
  ) {
    return authApi.register(accountType, email, password);
  },


  completeProfile(data: ShopProfileForm | ProfileForm,){
    return authApi.completeProfile(data);
  }
};
