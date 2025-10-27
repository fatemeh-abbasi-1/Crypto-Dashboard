import React from "react";
import clsx from "clsx";

import { IconProps } from "./Icon.types";

export const Icon: React.FC<IconProps> = ({
  icon: IconCmp,
  size = 18,
  variant = "default", // default | filled
  className,
}) => {
  const baseStyle =
    "flex items-center justify-center transition-colors duration-200 cursor-pointer";

  const variantStyles: Record<typeof variant, string> = {
    default: "text-gray-600",
    filled: `
      bg-white/5
      text-sky-50
      rounded-full p-2
      hover:bg-blue-600 hover:text-sky-50
    `,
  };

  return (
    <div className={clsx(baseStyle, variantStyles[variant], className)}>
      <IconCmp size={size} />
    </div>
  );
};
