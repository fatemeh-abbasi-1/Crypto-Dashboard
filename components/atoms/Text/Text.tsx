// src/components/atoms/Text/Text.tsx
import React from "react";
import { TextProps } from "./Text.type";
import clsx from "clsx";

const Text: React.FC<TextProps> = ({
  size = "medium",
  children,
  className,
}) => {
  const baseStyle = "text-white";

  const sizeStyles: Record<typeof size, string> = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <p className={clsx(baseStyle, sizeStyles[size], className)}>{children}</p>
  );
};

export default Text;
