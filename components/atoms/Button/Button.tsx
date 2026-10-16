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
    small: "min-h-[35px] px-3 py-2 text-sm",
    large: "min-h-[45px] w-full max-w-[350px] px-4 py-3 text-base",
  };

  return (
    <button
      {...props}
      className={clsx(
        "box-border inline-flex max-w-full items-center justify-center whitespace-nowrap rounded-lg bg-purple-500 font-semibold leading-normal text-white shadow-md transition-colors hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
