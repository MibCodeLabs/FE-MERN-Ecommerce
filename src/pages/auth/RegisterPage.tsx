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
import { toast } from "react-toastify";

import type { AccountType } from "../../types/AccountType";
import { ACCOUNT_TYPES } from "../../constants/constants";
import { useUI } from "../../context/UIContext";
import { useAuth } from "../../hooks/useAuth";
import type { AuthResponse } from "../../types/AuthResponse";
import { getErrorMessage } from "../../utils/GetErrorMessage";

interface RegisterProps {
  accountType: AccountType;
  onRegister: (
    accountType: AccountType,
    email: string,
    password: string,
  ) => Promise<AuthResponse>;

  showLogin?: boolean;
  loginPath?: string;
}

export default function Register({
  accountType,
  onRegister,
  showLogin = false,
  loginPath,
}: RegisterProps) {
  const { showLoading, hideLoading } = useUI();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  if (accountType === ACCOUNT_TYPES.STAFF) {
    throw new Error("Invalid Registration Account");
  }
  const registerTitle =
    accountType === ACCOUNT_TYPES.SHOP ? "Shop Register" : "Customer Register";

  const { persistAuth } = useAuth();

  function navigateAfterRegister(accountType: AccountType) {
    switch (accountType) {
      case ACCOUNT_TYPES.STAFF:
        throw new Error("Invalid Registration Account");
        break;
      //todo add the complete details page for both cases
      case ACCOUNT_TYPES.SHOP:
        navigate("/shop");
        break;

      case ACCOUNT_TYPES.CUSTOMER:
        navigate("/");
        break;
    }
  }

  async function handleSubmit() {
    showLoading("Registering New Account...");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      hideLoading();
      return;
    }
    try {
      const response = await onRegister(accountType, email, password);
      persistAuth(response.accessToken, response.refreshToken);
      toast.success("Registration Successful, Welcome!");
      navigateAfterRegister(accountType);
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
          {registerTitle}
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
          sx={{
            mb: 2,
          }}
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

        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          Register
        </Button>

        {showLogin && loginPath && (
          <Typography
            sx={{
              mt: 3,
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate(loginPath)}
              sx={{
                color: "primary.main",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Login
            </Box>
          </Typography>
        )}
      </Card>
    </Box>
  );
}
