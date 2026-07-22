import { Box, Typography } from "@mui/material";

export default function ShopFooter() {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                textAlign: "center",
            }}
        >
            <Typography variant="body2">
                Shop Portal
            </Typography>
        </Box>
    );
}
