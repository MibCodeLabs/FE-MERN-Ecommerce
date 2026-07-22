import { Box, Container, Typography } from "@mui/material";

export default function CustomerFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        bgcolor: "background.paper",
        color: "text.secondary",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} My Store. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
