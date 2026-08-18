import GuestGuard from "../guards/auth/GuestGuard";
import AccessGuard from "../guards/auth/AccessGuard";
import { ACCOUNT_TYPES } from "../constants/constants";
import CustomerLayout from "../layouts/customer/CustomerLayout";
import HomePage from "../pages/HomePage";
import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";
import { authService } from "../services/authService";
import ProfileCompletionGuard from "../guards/profile/ProfileCompletionGuard";

export const customerRoutes = [
  {
    element: <GuestGuard />,
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
    element: <AccessGuard accountType={ACCOUNT_TYPES.CUSTOMER} allowGuest />,
    children: [
      {
        path: "/",
        element: <CustomerLayout />,
        children: [
          {
            element: <ProfileCompletionGuard />,
            children: [{ index: true, element: <HomePage /> }],
          },
          {
            path: "customer-profile-completion",
            element: <h1>customer-profile-completion</h1>,
          },
        ],
      },
    ],
  },
];
