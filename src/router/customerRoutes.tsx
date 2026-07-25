import { ACCOUNT_TYPES } from "../constants/constants";
import CustomerLayout from "../layouts/customer/CustomerLayout";
import HomePage from "../pages/HomePage";
import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";
import { handleLogin } from "../utils/HandleLogin";

export const customerRoutes = [
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
            onLogin={handleLogin}
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
            onRegister={(type, email, password) => {
              console.log(type, email, password);
            }}
            showLogin
            loginPath="/login"
          />
        ),
      },
    ],
  },

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
];
