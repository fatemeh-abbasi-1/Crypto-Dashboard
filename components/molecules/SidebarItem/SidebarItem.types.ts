import { IconType } from "react-icons";

export interface SidebarItemProps {
  icon: IconType;
  label: string;
  href: string;
  active?: boolean;
  variant?: "default" | "filled";
}
