export type TitleVariant = "h1" | "h2";

export interface TitleProps {
  variant?: TitleVariant;

  children: React.ReactNode;

  className?: string;
}
