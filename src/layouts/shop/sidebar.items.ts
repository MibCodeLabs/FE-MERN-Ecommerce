import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";

import { type SidebarItem } from "../../types/SidebarItem"; 
export const shopSidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/shop",
    icon: DashboardIcon,
  },
  {
    label: "Products",
    path: "/shop/products",
    icon: Inventory2Icon,
  },
  {
    label: "Categories",
    path: "/shop/categories",
    icon: CategoryIcon,
  },
  {
    label: "Employees",
    path: "/shop/employees",
    icon: GroupIcon,
  },
  {
    label: "Orders",
    path: "/shop/orders",
    icon: ReceiptLongIcon,
  },
  {
    label: "Analytics",
    path: "/shop/analytics",
    icon: AnalyticsIcon,
  },
  {
    label: "Settings",
    path: "/shop/settings",
    icon: SettingsIcon,
  },
];
