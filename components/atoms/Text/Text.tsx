import React from "react";
import { TextProps } from "./Text.type";
import clsx from "clsx";

export const Text: React.FC<TextProps> = ({
  size = "medium", // small | medium | large
  color = "white", // white | gray | red | green
  children,
  className,
}) => {
  const sizeStyles: Record<typeof size, string> = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const colorStyles: Record<typeof color, string> = {
    white: "text-white",
    gray: "text-gray-600",
    red: "text-red-500",
    green: "text-green-700",
  };

  return (
    <p className={clsx(sizeStyles[size], colorStyles[color], className)}>
      {children}
    </p>
  );
};
export default Text;
