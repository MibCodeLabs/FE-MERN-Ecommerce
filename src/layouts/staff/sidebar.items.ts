import DashboardIcon from "@mui/icons-material/Dashboard";
import BadgeIcon from "@mui/icons-material/Badge";
import SecurityIcon from "@mui/icons-material/Security";
import StoreIcon from "@mui/icons-material/Store";
import ApprovalIcon from "@mui/icons-material/Approval";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

import { type SidebarItem } from "../../types/SidebarItem "; 
export const staffSidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/staff",
    icon: DashboardIcon,
  },

  {
    label: "Staff Management",
    path: "/staff/staff",
    icon: BadgeIcon,
  },

  {
    label: "Roles & Permissions",
    path: "/staff/permissions",
    icon: SecurityIcon,
  },

  {
    label: "Shops",
    path: "/staff/shops",
    icon: StoreIcon,
  },

  {
    label: "Shop Approvals",
    path: "/staff/shop-approvals",
    icon: ApprovalIcon,
  },

  {
    label: "Orders",
    path: "/staff/orders",
    icon: ReceiptLongIcon,
  },

  {
    label: "Customers",
    path: "/staff/customers",
    icon: PeopleIcon,
  },

  {
    label: "Complaints",
    path: "/staff/complaints",
    icon: ReportProblemIcon,
  },

  {
    label: "Analytics",
    path: "/staff/analytics",
    icon: AnalyticsIcon,
  },

  {
    label: "Audit Logs",
    path: "/staff/audit-logs",
    icon: HistoryIcon,
  },

  {
    label: "Settings",
    path: "/staff/settings",
    icon: SettingsIcon,
  },
];
