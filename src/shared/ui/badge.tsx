import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type BadgeVariant =
  | "default"
  | "success"
  | "success-vivid"
  | "warning"
  | "danger"
  | "primary"
  | "accent"
  | "info"
  | "ai"
  | "wallet";

const variantMap: Record<BadgeVariant, string> = {
  default:        "bg-surface-muted text-muted ring-1 ring-border-subtle",
  success:        "bg-success-soft text-success ring-1 ring-success/20",
  "success-vivid":"bg-success-vivid-soft text-success-vivid ring-1 ring-success-vivid/25",
  warning:        "bg-warning-soft text-warning ring-1 ring-warning/25",
  danger:         "bg-danger-soft text-danger ring-1 ring-danger/20",
  primary:        "bg-primary-soft text-primary ring-1 ring-primary/20",
  accent:         "bg-accent-soft text-amber-900 ring-1 ring-accent/30",
  info:           "bg-info-soft text-info ring-1 ring-info/25",
  ai:             "bg-gradient-to-r from-primary-xlight to-accent-soft text-primary ring-1 ring-border-subtle",
  wallet:         "bg-wallet-soft text-wallet ring-1 ring-wallet/20",
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
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold",
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
