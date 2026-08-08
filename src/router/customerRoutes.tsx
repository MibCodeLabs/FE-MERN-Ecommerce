import GuestRoute from "../auth/GuestRoute";
import ProtectedRoute from "../auth/ProtectedRoute";
import { ACCOUNT_TYPES } from "../constants/constants";
import CustomerLayout from "../layouts/customer/CustomerLayout";
import HomePage from "../pages/HomePage";
import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";
import { authService } from "../services/authService";

export const customerRoutes = [
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <CustomerLayout />,
        children: [
          {
            index: true,
            element: (
              <Login
                accountType={ACCOUNT_TYPES.CUSTOMER}
                showRegister
                registerPath="/register"
                onLogin={authService.handleLogin}
              />
            ),
          },
        ],
      },
      {
        path: "/register",
        element: <CustomerLayout />,
        children: [
          {
            index: true,
            element: (
              <Register
                accountType={ACCOUNT_TYPES.CUSTOMER}
                onRegister={authService.handleRegister}
                showLogin
                loginPath="/login"
              />
            ),
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute accountType={ACCOUNT_TYPES.CUSTOMER} allowGuest/>,
    children: [
      {
        path: "/",
        element: <CustomerLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
    ],
  },
];
