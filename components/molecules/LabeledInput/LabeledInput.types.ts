import { InputProps } from "@/components/atoms/Input/Input.types";
export interface LabeledInputProps extends InputProps {
  id: string; // بهتر است id اجباری باشه برای a11y
  label?: string;
  hint?: string;
  required?: boolean;
  errorMessage?: string | null;
  showError?: boolean; // کنترل اینکه خطا نمایش داده شود یا خیر
  hasError?: boolean;
  isInvalid?: boolean;
}
