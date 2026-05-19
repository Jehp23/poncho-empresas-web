import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
};

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  padding = "md",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-card border border-border-subtle bg-surface shadow-card",
        paddingMap[padding],
        interactive && "transition-shadow duration-200 hover:shadow-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
