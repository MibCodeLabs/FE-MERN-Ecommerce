import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import { type SidebarItem } from "../../types/SidebarItem ";
type SidebarMenuProps = {
  items: SidebarItem[];
};

export default function SidebarMenu({ items }: SidebarMenuProps) {
  return (
    <Box
      component="aside"
      sx={{
        width: 260,
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <List>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
