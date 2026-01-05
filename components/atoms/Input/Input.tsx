"use client";

import React, { InputHTMLAttributes, useId, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    const id = useId();

    return (
      <div className="relative w-full">
        <input
          id={id}
          ref={ref}
          placeholder=" "
          className={clsx(
            "peer w-full rounded-md border border-purple-500 bg-transparent px-3 pt-5 pb-2 text-sm text-white placeholder-transparent focus:border-purple-400 focus:outline-none",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={clsx(
            "absolute left-3 top-1 text-sm text-purple-300 transition-all duration-200",
            "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm",
            "peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-100 font-bold"
          )}
        >
          {label}
        </label>
        {error && (
          <span className="mt-1 block text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
