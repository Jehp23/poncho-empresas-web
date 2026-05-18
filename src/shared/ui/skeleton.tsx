import { cn } from "@/shared/lib/cn";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-surface-muted",
        className,
      )}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-card">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-8 w-40" />
      <Skeleton className="mt-6 h-10 w-full" />
    </div>
  );
}
