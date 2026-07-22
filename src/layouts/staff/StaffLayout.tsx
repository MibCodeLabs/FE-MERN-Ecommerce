import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StaffHeader from "./StaffHeader";
import StaffSidebar from "./StaffSidebar";
import StaffFooter from "./StaffFooter";


export default function StaffLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
            }}
        >
            <StaffHeader />

            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                }}
            >
                <StaffSidebar />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>

            <StaffFooter />
        </Box>
    );
}
