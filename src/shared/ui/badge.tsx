import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "primary"
  | "accent";

const variantMap: Record<BadgeVariant, string> = {
  default: "bg-surface-muted text-muted ring-1 ring-border-subtle",
  success: "bg-success-soft text-success ring-1 ring-success/20",
  warning: "bg-warning-soft text-warning ring-1 ring-warning/25",
  danger: "bg-danger-soft text-danger ring-1 ring-danger/20",
  primary: "bg-primary-soft text-primary ring-1 ring-primary/20",
  accent: "bg-accent-soft text-amber-900 ring-1 ring-accent/30",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold",
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
