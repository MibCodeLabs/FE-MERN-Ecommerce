import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  shopProfileSchema,
  type ShopProfileForm,
} from "../../api-schema/shop/shopProfileSchema";
import { useUI } from "../../context/UIContext";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/GetErrorMessage";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ShopProfileCompletionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopProfileForm>({
    resolver: zodResolver(shopProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
    },
  });
  const { showLoading, hideLoading } = useUI();
  const { persistAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: ShopProfileForm) => {
    showLoading("Saving profile...");

    try {
      const response = await authService.completeProfile(data);
      persistAuth(response.accessToken, response.refreshToken);

      toast.success(
        `Welcome ${data.firstName} ${data.lastName} your basic profile has been completed`,
      );
      navigate("/");

      toast.success("Profile completed!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      hideLoading();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={2}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={3}>
              {/* Header */}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Complete your profile
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Tell us a little about yourself before you set up your shop.
                </Typography>
              </Box>

              {/* Form */}
              <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                spacing={2}
                noValidate
              >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    {...register("firstName")}
                    fullWidth
                    label="First name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    disabled={isSubmitting}
                  />

                  <TextField
                    {...register("lastName")}
                    fullWidth
                    label="Last name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    disabled={isSubmitting}
                  />
                </Stack>

                <TextField
                  {...register("contactNumber")}
                  fullWidth
                  label="Contact number"
                  placeholder="+92 300 1234567"
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber?.message}
                  disabled={isSubmitting}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mt: 1 }}
                >
                  {isSubmitting ? "Saving..." : "Complete profile"}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
