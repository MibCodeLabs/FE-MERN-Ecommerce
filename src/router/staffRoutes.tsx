import StaffLayout from "../layouts/staff/StaffLayout";
import Login from "../pages/auth/LoginPage";
import ProtectedRoute from "../auth/ProtectedRoute";

import { ACCOUNT_TYPES } from "../constants/constants";
import { handleLogin } from "../services/authService";
import GuestRoute from "../auth/GuestRoute";

export const staffRoutes = [
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/staff/login",
        element: (
          <Login accountType={ACCOUNT_TYPES.STAFF} onLogin={handleLogin} />
        ),
      },
    ],
  },

  {
    element: <ProtectedRoute accountType={ACCOUNT_TYPES.STAFF} />,

    children: [
      {
        path: "/staff",
        element: <StaffLayout />,
        children: [
          {
            index: true,
            element: <h1>Staff Dashboard</h1>,//todo: add this
          },
        ],
      },
    ],
  },
];
