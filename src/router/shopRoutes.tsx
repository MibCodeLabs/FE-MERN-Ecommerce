import ShopLayout from "../layouts/shop/ShopLayout";
import Login from "../pages/auth/LoginPage";
import AccessGuard from "../guards/auth/AccessGuard";

import { ACCOUNT_TYPES } from "../constants/constants";
import Register from "../pages/auth/RegisterPage";
import GuestGuard from "../guards/auth/GuestGuard";
import { authService } from "../services/authService";
import ProfileCompletionGuard from "../guards/profile/ProfileCompletionGuard";
import ShopProfileCompletionPage from "../pages/shop/ShopProfileCompletionPage";
import ProfileIncompleteGuard from "../guards/profile/ProfileIncompleteGuard";

export const shopRoutes = [
  {
    element: <GuestGuard />,
    children: [
      {
        path: "/shop/login",
        element: (
          <Login
            accountType={ACCOUNT_TYPES.SHOP}
            showRegister
            registerPath="/shop/register"
            onLogin={authService.handleLogin}
          />
        ),
      },
      {
        path: "/shop/register",
        element: (
          <Register
            accountType={ACCOUNT_TYPES.SHOP}
            onRegister={authService.handleRegister}
            showLogin
            loginPath="/shop/login"
          />
        ),
      },
    ],
  },

  {
    element: <AccessGuard accountType={ACCOUNT_TYPES.SHOP} />,

    children: [
      {
        path: "/shop",
        element: <ShopLayout />,
        children: [
          {
            element: <ProfileCompletionGuard />,
            children: [{ index: true, element: <h1>Shop Dashboard</h1> }],
          },
          {
            path: "profile-completion",
            element: (
              <ProfileIncompleteGuard>
                <ShopProfileCompletionPage />
              </ProfileIncompleteGuard>
            ),
          },
        ],
      },
    ],
  },
];
