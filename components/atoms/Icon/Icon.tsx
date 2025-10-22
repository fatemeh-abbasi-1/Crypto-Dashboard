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
    default: "text-gray-300",
    filled: `
      bg-white/5
      text-[var(--blue)]
      rounded-full p-2
      hover:bg-[var(--blue)] hover:text-white
    `,
  };

  return (
    <div className={clsx(baseStyle, variantStyles[variant], className)}>
      <IconCmp size={size} />
    </div>
  );
};
