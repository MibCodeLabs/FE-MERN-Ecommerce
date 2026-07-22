import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader";
import ShopSidebar from "./ShopSidebar";
import ShopFooter from "./ShopFooter";


export default function ShopLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <ShopHeader />

            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                }}
            >
                <ShopSidebar />

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

            <ShopFooter />
        </Box>
    );
}
