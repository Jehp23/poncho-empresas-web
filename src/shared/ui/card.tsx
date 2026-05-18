import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  tone?: "default" | "primary" | "accent" | "danger" | "success";
};

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

const toneMap = {
  default: "border-border-subtle bg-surface",
  primary: "card-tone-primary",
  accent: "card-tone-accent",
  danger: "card-tone-danger",
  success: "card-tone-success",
};

export function Card({
  padding = "md",
  interactive = false,
  tone = "default",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-card border shadow-card",
        toneMap[tone],
        paddingMap[padding],
        interactive && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
