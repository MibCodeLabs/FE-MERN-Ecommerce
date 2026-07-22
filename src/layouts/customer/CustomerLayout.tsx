import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import CustomerFooter from "./CustomerFooter";


export default function CustomerLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CustomerNavbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>

      <CustomerFooter />
    </Box>
  );
}
