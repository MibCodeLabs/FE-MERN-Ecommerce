import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CustomThemeProvider } from "./context/ThemeContext.tsx";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext.tsx";
import { UIProvider } from "./context/UIContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <UIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UIProvider>
    </CustomThemeProvider>
  </StrictMode>,
);
