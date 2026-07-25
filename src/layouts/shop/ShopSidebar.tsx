import SidebarMenu from "../../components/navigation/SidebarMenu";
import { shopSidebarItems } from "./sidebar.items";

export default function ShopSidebar() {
  return <SidebarMenu items={shopSidebarItems} />;
}
