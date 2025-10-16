import React from "react";
import { IconProps } from "./Icon.types";
import clsx from "clsx";

export const Icon: React.FC<IconProps> = ({
  icon: IconCmp,
  size = 18,
  variant = "default", // default | filled
  className,
}) => {
  const baseStyle =
    "flex items-center justify-center transition-colors duration-200 cursor-pointer";

  const variantStyles: Record<typeof variant, string> = {
    default: "text-gray",
    filled: `
      bg-[var(--navy-mid)] 
      text-[var(--blue)] 
      rounded-full p-2 
      hover:bg-[var(--blue)] hover:text-[var(--white)]
    `,
  };

  return (
    <div className={clsx(baseStyle, variantStyles[variant], className)}>
      <IconCmp size={size} />
    </div>
  );
};
