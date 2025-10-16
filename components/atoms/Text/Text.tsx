import React from "react";
import { TextProps } from "./Text.type";
import clsx from "clsx";

export const Text: React.FC<TextProps> = ({
  size = "medium", // small | medium | large
  color = "white", // white | gray | red
  children,
  className,
}) => {
  const sizeStyles: Record<typeof size, string> = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const colorStyles: Record<typeof color, string> = {
    white: "text-[var(--white)]",
    gray: "text-[var(--gray)]",
    red: "text-[var(--red)]",
  };

  return (
    <p className={clsx(sizeStyles[size], colorStyles[color], className)}>
      {children}
    </p>
  );
};
export default Text;