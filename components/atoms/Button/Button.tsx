import React from "react";
import clsx from "clsx";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  size = "large",
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    small: "w-[110px] h-[35px] text-sm",
    large: "w-[350px] h-[45px] text-base",
  };

  return (
    <button
      {...props} // 👈 تمام رفتارهای استاندارد HTML منتقل می‌شن
      className={clsx(
        "bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
