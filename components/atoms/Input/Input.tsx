import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  errorMessage?: string; // برای گرفتن پیغام خطا
  isInvalid?: boolean; // اگر اشتباهی وجود داره
};

 const Input: React.FC<InputProps> = ({
  hasError,
  errorMessage,
  isInvalid,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <input
        {...props}
        className={clsx(
          "w-full rounded-xl bg-[#101828] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-gray-100 placeholder-gray-500 outline-none transition-all",
          hasError && "border-red-500",
          isInvalid && "border-red-500", // برای خطا
          className
        )}
      />
      {isInvalid && errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span> // نمایش پیغام خطا
      )}
    </div>
  );
};
export default Input