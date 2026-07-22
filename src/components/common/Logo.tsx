import { Box, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link as RouterLink } from "react-router-dom";

type LogoProps = {
  to?: string;
};

export default function Logo({ to = "/" }: LogoProps) {
  return (
    <Box
      component={RouterLink}
      to={to}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <StorefrontIcon fontSize="large" />

      <Typography
        variant="h6"
        component="span"
        sx={{
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
      >
        BazaarConnect
      </Typography>
    </Box>
  );
}