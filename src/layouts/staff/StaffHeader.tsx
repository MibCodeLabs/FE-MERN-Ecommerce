import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
} from "@mui/material";

import { useThemeMode } from "../../context/ThemeContext";
import Logo from "../../components/common/Logo";

export default function Header() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo to="/staff" />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="inherit"
          onClick={toggleTheme}
        >
          {mode === "light"
            ? <DarkModeIcon />
            : <LightModeIcon />}
        </IconButton>

        <IconButton color="inherit">
          <NotificationsNoneOutlinedIcon />
        </IconButton>

        <IconButton color="inherit">
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
