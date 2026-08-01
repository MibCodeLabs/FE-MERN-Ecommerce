import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useUI } from "../../context/UIContext";

export default function GlobalLoadingOverlay() {
  const { loadingMessage } = useUI();

  return (
    <Backdrop
      open={!!loadingMessage}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" />

        <Typography variant="body1">{loadingMessage}</Typography>
      </Box>
    </Backdrop>
  );
}
