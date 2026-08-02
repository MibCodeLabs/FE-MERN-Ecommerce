import LogoutIcon from "@mui/icons-material/Logout";
import type { AccountMenuItem } from "../../types/AccountMenuItem";


export function createStaffAccountMenu(
  handleLogout: () => void,
): AccountMenuItem[] {
  return [
    {
      label: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];
}