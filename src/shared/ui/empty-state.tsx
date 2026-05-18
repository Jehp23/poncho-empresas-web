import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { Button } from "./button";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-surface-muted/40 px-6 py-12 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-primary shadow-sm">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-poncho text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-5">
          <Button>{actionLabel}</Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
