import { useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import type { AccountType } from "../../types/AccountType";
import { ACCOUNT_TYPES } from "../../constants/constants";
import { useUI } from "../../context/UIContext";
import { getErrorMessage } from "../../utils/GetErrorMessage";
import { toast } from "react-toastify";
import type { AuthResponse } from "../../types/AuthResponse";
import { useAuth } from "../../context/AuthContext";

interface LoginProps {
  accountType: AccountType;

  onLogin: (
    accountType: AccountType,
    email: string,
    password: string,
  ) => Promise<AuthResponse>;

  showRegister?: boolean;
  registerPath?: string;
}

export default function Login({
  accountType,
  onLogin,
  showRegister = false,
  registerPath,
}: LoginProps) {
  const { persistAuth } = useAuth();
  const { showLoading, hideLoading } = useUI();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginTitle =
    accountType === ACCOUNT_TYPES.STAFF
      ? "Staff Login"
      : accountType === ACCOUNT_TYPES.SHOP
        ? "Shop Login"
        : "Customer Login";

  function navigateAfterLogin(accountType: AccountType) {
    switch (accountType) {
      case ACCOUNT_TYPES.STAFF:
        navigate("/staff");
        break;

      case ACCOUNT_TYPES.SHOP:
        navigate("/shop");
        break;

      case ACCOUNT_TYPES.CUSTOMER:
        navigate("/");
        break;
    }
  }

  async function handleSubmit() {
    showLoading("Signing in...");

    try {
      const response = await onLogin(accountType, email, password);

      persistAuth(response.accessToken,response.refreshToken);

      toast.success("Welcome!");
      navigateAfterLogin(accountType);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      hideLoading();
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Card
        sx={{
          width: 380,
          p: 4,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 3,
            color: "text.primary",
          }}
        >
          {loginTitle}
        </Typography>

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 3,
          }}
        >
          Login
        </Button>

        {showRegister && registerPath && (
          <Typography
            sx={{
              mt: 3,
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate(registerPath)}
              sx={{
                color: "primary.main",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Register
            </Box>
          </Typography>
        )}
      </Card>
    </Box>
  );
}
