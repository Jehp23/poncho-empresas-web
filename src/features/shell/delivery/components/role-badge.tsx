import type { RolUsuario } from "@/features/shell/domain/roles";
import { ROL_LABELS } from "@/features/shell/domain/roles";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/cn";

const variantMap: Record<
  RolUsuario,
  "primary" | "info" | "accent" | "default"
> = {
  admin: "primary",
  finanzas: "info",
  tesoreria: "accent",
  contador: "default",
};

export function RoleBadge({
  rol,
  className,
}: {
  rol: RolUsuario;
  className?: string;
}) {
  return (
    <Badge variant={variantMap[rol]} className={cn("capitalize", className)}>
      {ROL_LABELS[rol]}
    </Badge>
  );
}
