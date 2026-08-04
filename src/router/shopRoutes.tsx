import ShopLayout from "../layouts/shop/ShopLayout";
import Login from "../pages/auth/LoginPage";
import ProtectedRoute from "../auth/ProtectedRoute";

import { ACCOUNT_TYPES } from "../constants/constants";
import Register from "../pages/auth/RegisterPage";
import { handleLogin } from "../services/authService";
import GuestRoute from "../auth/GuestRoute";

export const shopRoutes = [
  {
    element: <GuestRoute  />,
    children: [
      {
        path: "/shop/login",
        element: (
          <Login
            accountType={ACCOUNT_TYPES.SHOP}
            showRegister
            registerPath="/shop/register"
            onLogin={handleLogin}
          />
        ),
      },
      {
        path: "/shop/register",
        element: (
          <Register
            accountType={ACCOUNT_TYPES.SHOP}
            onRegister={(type, email, password) => {
              console.log(type, email, password);
            }}
            showLogin
            loginPath="/shop/login"
          />
        ),
      },
    ],
  },

  {
    element: <ProtectedRoute accountType={ACCOUNT_TYPES.SHOP} />,

    children: [
      {
        path: "/shop",
        element: <ShopLayout />,
        children: [
          {
            index: true,
            element: <h1>Shop Dashboard</h1>,
          },
        ],
      },
    ],
  },
];
