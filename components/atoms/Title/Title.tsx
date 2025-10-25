import React from "react";
import { TitleProps } from "./Title.type";
import clsx from "clsx";

export const Title: React.FC<TitleProps> = ({
  variant = "h1",
  color = "white",
  children,
  className,
}) => {
  const baseStyle = "leading-tight";

  const variantStyles: Record<typeof variant, string> = {
    h1: "text-5xl font-bold",
    h2: "text-2xl font-semibold",
  };

  const colorStyles: Record<typeof color, string> = {
    white: "text-white",
    gray: "text-gray",
    red: "text-red",
  };

  const Tag = variant;

  return (
    <Tag
      className={clsx(
        baseStyle,
        variantStyles[variant],
        colorStyles[color],
        className
      )}
    >
      {children}
    </Tag>
  );
};
export default Title;
