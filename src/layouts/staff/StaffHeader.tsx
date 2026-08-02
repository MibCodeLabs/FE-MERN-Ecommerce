import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

import { useThemeMode } from "../../context/ThemeContext";
import Logo from "../../components/common/Logo";
import AccountMenu from "../../components/common/AccountMenu";
import { createStaffAccountMenu } from "./StaffAccountMenu";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { mode, toggleTheme } = useThemeMode();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/shop/login");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo to="/staff" />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <IconButton color="inherit">
          <NotificationsNoneOutlinedIcon />
        </IconButton>

        <AccountMenu menuItems={createStaffAccountMenu(handleLogout)} />
      </Toolbar>
    </AppBar>
  );
}
