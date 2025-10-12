
export type TextSize = 'small' | 'medium' | 'large';

export interface TextProps {
  /** سایز متن */
  size?: TextSize;
  /** محتوای متنی */
  children: React.ReactNode;
  /** کلاس اضافی (اختیاری) */
  className?: string;
}
