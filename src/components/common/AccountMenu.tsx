import { useState } from "react";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import type { AccountMenuItem } from "../../types/AccountMenuItem";

interface AccountMenuProps {
  menuItems: AccountMenuItem[];
}

export default function AccountMenu({
  menuItems: menuItems,
}: AccountMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleItemClick(action: () => void) {
    handleClose();
    action();
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <AccountCircleOutlinedIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => handleItemClick(item.onClick)}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}

            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
