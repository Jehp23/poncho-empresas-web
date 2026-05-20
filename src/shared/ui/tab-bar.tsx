"use client";

import { cn } from "@/shared/lib/cn";

export type TabItem<T extends string = string> = {
  id: T;
  label: string;
};

type TabBarProps<T extends string> = {
  tabs: readonly TabItem<T>[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
};

export function TabBar<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: TabBarProps<T>) {
  return (
    <div
      className={cn(
        "flex gap-1 rounded-full border border-border-subtle bg-surface p-1 shadow-xs",
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
            active === tab.id
              ? "bg-primary-soft text-primary"
              : "text-muted hover:text-ink",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
