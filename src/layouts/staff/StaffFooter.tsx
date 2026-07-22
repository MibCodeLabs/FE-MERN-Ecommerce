import { Box, Typography } from "@mui/material";

export default function StaffFooter() {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                textAlign: "center",
            }}
        >
            <Typography variant="body2">
                Internal Portal
            </Typography>
        </Box>
    );
}
