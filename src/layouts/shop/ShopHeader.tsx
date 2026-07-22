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

import Logo from "../../components/common/Logo";
import { useThemeMode } from "../../context/ThemeContext";
import ShopSwitcher from "./components/ShopSwitcher";

export default function Header() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo to="/shop" />


        <Box sx={{ flexGrow: 1 }} />

        <ShopSwitcher />
        <IconButton color="inherit" onClick={toggleTheme}>
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
