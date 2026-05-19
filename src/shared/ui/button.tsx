import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-sm hover:bg-primary-hover active:scale-[0.98]",
  secondary:
    "border border-border-subtle bg-surface text-ink shadow-sm hover:bg-surface-muted active:scale-[0.98]",
  accent:
    "bg-accent text-ink shadow-sm hover:bg-accent-hover active:scale-[0.98]",
  ghost: "text-muted hover:bg-surface-muted hover:text-ink",
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-150",
        "disabled:pointer-events-none disabled:opacity-50",
        variantMap[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
