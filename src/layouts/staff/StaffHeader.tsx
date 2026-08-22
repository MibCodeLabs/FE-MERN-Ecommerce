import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

import { useThemeMode } from "../../context/ThemeContext";
import Logo from "../../components/common/Logo";
import AccountMenu from "../../components/common/AccountMenu";
import { createStaffAccountMenu } from "./StaffAccountMenu";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function Header() {
  const { mode, toggleTheme } = useThemeMode();
  const { clearAuth } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      clearAuth();
      navigate("/staff/login");
    }
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
