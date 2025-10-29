import React from "react";
import clsx from "clsx";

import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  size = "large",
  className,
  children,
}) => {
  const sizeClasses = {
    small: "w-[110px] h-[35px] text-sm", // اندازه کوچک
    large: "w-[350px] h-[45px] text-base", // اندازه بزرگ
  };

  return (
    <button
      className={clsx(
        "bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        sizeClasses[size], // استفاده از سایز
        className
      )}
    >
      {children}
    </button>
  );
};
export default Button;
