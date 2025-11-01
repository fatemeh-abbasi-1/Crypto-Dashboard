import React from "react";
import clsx from "clsx";

import { InputProps } from "./Input.types";

const Input: React.FC<InputProps> = ({ hasError, isInvalid, className }) => {
  return (
    <input
      className={clsx(
        "w-full rounded-xl bg-transparent border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-gray-100 placeholder-gray-500 outline-none transition-all",
        (hasError || isInvalid) && "border-red-500",
        className
      )}
    />
  );
};

export default Input;
