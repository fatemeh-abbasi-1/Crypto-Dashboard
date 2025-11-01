import React from "react";
import Input from "@/components/atoms/Input/Input";
import Text from "@/components/atoms/Text/Text";

import { LabeledInputProps } from "./LabeledInput.types";

const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  hint,
  required,
  errorMessage,
  showError = false,
  hasError,
  isInvalid,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label htmlFor={id} className="flex items-center space-x-1">
          <Text size="medium">{label}</Text>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Input id={id} hasError={hasError} isInvalid={isInvalid} />

      {!showError && hint && (
        <Text size="small" color="gray">
          {hint}
        </Text>
      )}

      {showError && errorMessage && (
        <Text size="small" color="red" className="mt-1">
          {errorMessage}
        </Text>
      )}
    </div>
  );
};

export default LabeledInput;
