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
import { profileSchema, type ProfileForm } from "../../api-schema/customer/customerProfileSchema";


export default function CustomerProfileCompletionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileForm) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      addresses: [
        {
          title: "Home",
          street: data.street,
          city: data.city,
          state: data.state,
          country: data.country,
          postalCode: data.postalCode,
          isDefault: true,
        },
      ],
    };

    console.log(payload);

    // TODO:
    // await customerService.completeProfile(payload);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "grey.100",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Complete your profile
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Just a few details and you're ready to go.
                </Typography>
              </Box>

              <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                spacing={2}
              >
                <Stack direction="row" spacing={2}>
                  <TextField
                    {...register("firstName")}
                    fullWidth
                    label="First name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />

                  <TextField
                    {...register("lastName")}
                    fullWidth
                    label="Last name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Stack>

                <TextField
                  {...register("phone")}
                  fullWidth
                  label="Phone number"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />

                <Typography variant="subtitle1" sx={{ pt: 1, fontWeight: 600 }}>
                  Default address
                </Typography>

                <TextField
                  {...register("street")}
                  fullWidth
                  label="Street"
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />

                <Stack direction="row" spacing={2}>
                  <TextField
                    {...register("city")}
                    fullWidth
                    label="City"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />

                  <TextField
                    {...register("state")}
                    fullWidth
                    label="State"
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <TextField
                    {...register("country")}
                    fullWidth
                    label="Country"
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />

                  <TextField
                    {...register("postalCode")}
                    fullWidth
                    label="Postal code"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                  />
                </Stack>

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
