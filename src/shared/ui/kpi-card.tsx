import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export interface KpiCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  change: string;
  changeColor?: "success" | "warning" | "danger" | "muted" | "info";
  accentColor?: string;
}

const changeColorMap = {
  success: "text-success-vivid",
  warning: "text-warning",
  danger:  "text-danger",
  muted:   "text-muted",
  info:    "text-info",
};

export function KpiCard({
  label,
  value,
  change,
  changeColor = "muted",
  accentColor = "var(--pe-primary)",
  className,
  ...rest
}: KpiCardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-card border border-border-subtle bg-surface px-5 py-4 shadow-xs",
        className,
      )}
      style={{ borderLeft: `4px solid ${accentColor}`, ...rest.style }}
    >
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted">
        {label}
      </p>
      <p className="font-display mt-1 text-[22px] font-bold tracking-tight text-ink">
        {value}
      </p>
      <p className={cn("mt-1 text-[11.5px] font-medium", changeColorMap[changeColor])}>
        {change}
      </p>
    </div>
  );
}
