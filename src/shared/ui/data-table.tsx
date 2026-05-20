import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Card } from "./card";

type DataTableProps = {
  title?: string;
  subtitle?: string;
  headerExtra?: ReactNode;
  columns: string[];
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function DataTable({
  title,
  subtitle,
  headerExtra,
  columns,
  children,
  footer,
  className,
}: DataTableProps) {
  return (
    <Card padding="none" className={cn("overflow-hidden", className)}>
      {(title || headerExtra) && (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border-subtle px-5 py-4">
          <div>
            {title && <p className="text-section-title">{title}</p>}
            {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
          </div>
          {headerExtra}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border-subtle bg-surface-muted/50">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {footer && (
        <div className="border-t border-border-subtle bg-surface-muted/30 px-5 py-3">
          {footer}
        </div>
      )}
    </Card>
  );
}
