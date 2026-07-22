import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ShopSwitcher() {
  return (
    <Button
      color="inherit"
      endIcon={<KeyboardArrowDownIcon />}
    >
      Select Shop
    </Button>
  );
}
