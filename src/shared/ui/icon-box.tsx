import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type IconBoxTone = "primary" | "accent" | "success" | "danger" | "warning";

const toneMap: Record<IconBoxTone, string> = {
  primary: "bg-primary-soft text-primary ring-1 ring-primary/15",
  accent: "bg-accent-soft text-amber-800 ring-1 ring-accent/25",
  success: "bg-success-soft text-success ring-1 ring-success/20",
  danger: "bg-danger-soft text-danger ring-1 ring-danger/20",
  warning: "bg-warning-soft text-warning ring-1 ring-warning/25",
};

export function IconBox({
  icon: Icon,
  className,
  size = "md",
  tone = "primary",
}: {
  icon: LucideIcon;
  className?: string;
  size?: "sm" | "md";
  tone?: IconBoxTone;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        toneMap[tone],
        size === "sm" ? "h-8 w-8" : "h-9 w-9",
        className,
      )}
    >
      <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
    </div>
  );
}
