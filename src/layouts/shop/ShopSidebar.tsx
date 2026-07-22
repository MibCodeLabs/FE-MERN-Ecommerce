import { Box } from "@mui/material";

export default function ShopSidebar() {
    return (
        <Box
            component="aside"
            sx={{
                width: 240,
                borderRight: 1,
                borderColor: "divider",
            }}
        />
    );
}
