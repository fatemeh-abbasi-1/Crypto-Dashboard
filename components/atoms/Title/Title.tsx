// src/components/atoms/Title/Title.tsx
import React from "react";
import { TitleProps } from "./Title.type";
import clsx from "clsx";

const Title: React.FC<TitleProps> = ({
  variant = "h1",
  children,
  className,
}) => {
  const baseStyle = "text-white leading-tight";

  const variantStyles: Record<typeof variant, string> = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
  };

  const Tag = variant;

  return (
    <Tag className={clsx(baseStyle, variantStyles[variant], className)}>
      {children}
    </Tag>
  );
};

export default Title;
