import StaffLayout from "../layouts/staff/StaffLayout";
import Login from "../pages/auth/LoginPage";
import AccessGuard from "../guards/auth/AccessGuard";

import { ACCOUNT_TYPES } from "../constants/constants";
import GuestGuard from "../guards/auth/GuestGuard";
import { authService } from "../services/authService";
import ProfileCompletionGuard from "../guards/profile/ProfileCompletionGuard";

export const staffRoutes = [
  {
    element: <GuestGuard />,
    children: [
      {
        path: "/staff/login",
        element: (
          <Login
            accountType={ACCOUNT_TYPES.STAFF}
            onLogin={authService.handleLogin}
          />
        ),
      },
    ],
  },

  {
    element: <AccessGuard accountType={ACCOUNT_TYPES.STAFF} />,

    children: [
      {
        path: "/staff",
        element: <StaffLayout />,
        children: [
          {
            element: <ProfileCompletionGuard />,
            children: [
              {
                index: true,
                element: <h1>Staff Dashboard</h1>,
              },
            ],
          },
          {
            path: "staff-profile-completion",
            element: <h1>staff-profile-completion</h1>,
          },
        ],
      },
    ],
  },
];
