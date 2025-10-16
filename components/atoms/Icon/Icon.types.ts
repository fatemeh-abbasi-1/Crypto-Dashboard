import { IconType } from "react-icons";

export interface IconProps {
  icon: IconType;
  size?: number;
  variant?: "default" | "filled";
  className?: string;
}
