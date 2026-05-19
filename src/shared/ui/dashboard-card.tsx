import type { HTMLAttributes } from "react";
import { Card, type CardProps } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";

/** Card de dashboard: altura uniforme en grilla, contenido contenido */
export function DashboardCard({
  className,
  children,
  padding = "lg",
  ...rest
}: CardProps) {
  return (
    <Card
      padding={padding}
      className={cn("flex h-full min-h-0 flex-col overflow-hidden", className)}
      {...rest}
    >
      {children}
    </Card>
  );
}

export function DashboardCardBody({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)} {...rest}>
      {children}
    </div>
  );
}

export function DashboardCardFooter({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-auto shrink-0 pt-4", className)} {...rest}>
      {children}
    </div>
  );
}
