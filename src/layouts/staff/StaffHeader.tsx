import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useThemeMode } from "../../context/ThemeContext";
import Logo from "../../components/common/Logo";

export default function StaffHeader() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo to="/staff"/>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
