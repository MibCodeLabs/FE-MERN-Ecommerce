import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountMenu from "../../components/common/AccountMenu";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

import Logo from "../../components/common/Logo";
import { useThemeMode } from "../../context/ThemeContext";
import ShopSwitcher from "./components/ShopSwitcher";
import { createShopAccountMenu } from "./ShopAccountMenu";

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
        <Logo to="/shop" />

        <Box sx={{ flexGrow: 1 }} />

        <ShopSwitcher />
        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <IconButton color="inherit">
          <NotificationsNoneOutlinedIcon />
        </IconButton>

          <AccountMenu
            menuItems={createShopAccountMenu(handleLogout)}
          />
      </Toolbar>
    </AppBar>
  );
}
