import React from "react";

import { IconProps } from "./Icon.types";

export const Icon: React.FC<IconProps> = ({
  icon: IconCmp,
  size = 18,
  className,
}) => {
  return (
    <div className="rounded-full p-2 bg-white/10 ">
      <IconCmp size={size} className={`text-blue-400 ${className}`} />
    </div>
  );
};
