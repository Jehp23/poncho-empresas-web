"use client";

import { cn } from "@/shared/lib/cn";

export type FilterChipItem<T extends string = string> = {
  id: T;
  label: string;
};

type FilterChipsProps<T extends string> = {
  items: readonly FilterChipItem<T>[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
};

export function FilterChips<T extends string>({
  items,
  active,
  onChange,
  className,
}: FilterChipsProps<T>) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-150",
            active === item.id
              ? "border-primary/30 bg-primary-soft text-primary"
              : "border-border-subtle bg-surface text-muted hover:border-border-strong hover:text-ink",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
