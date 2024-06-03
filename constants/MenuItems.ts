import { Ionicons } from "@expo/vector-icons";

export interface MenuItem {
  key: string;
  title: string;
  icon: typeof Ionicons.defaultProps;
}

const menuItems: MenuItem[] = [
  { key: "statement", title: "Statement", icon: "list-circle-sharp" },
  { key: "converter", title: "Converter", icon: "swap-horizontal" },
  { key: "background", title: "Background", icon: "image" },
  { key: "account", title: "Add new account", icon: "person-add" },
];

export default menuItems;
