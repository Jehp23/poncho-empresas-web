import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { ActividadReciente, EstadoActividad } from "@/shared/types/app";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { IconBox } from "@/shared/ui/icon-box";
import { SectionHeader } from "@/shared/ui/section-header";
import { formatMonto } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

const tipoConfig = {
  transferencia: { icon: ArrowLeftRight, label: "Transferencia" },
  deposito: { icon: ArrowDownToLine, label: "Depósito" },
  echeq: { icon: FileText, label: "eCheq" },
  inversion: { icon: TrendingUp, label: "Inversión" },
};

const estadoVariant: Record<
  EstadoActividad,
  "success" | "default" | "warning" | "danger"
> = {
  completado: "success",
  pendiente: "default",
  en_revision: "warning",
  requiere_atencion: "danger",
};

const estadoLabel: Record<EstadoActividad, string> = {
  completado: "Completado",
  pendiente: "Pendiente",
  en_revision: "En revisión",
  requiere_atencion: "Atención",
};

export function ActivityPreview({
  items,
  limit = 5,
}: {
  items: ActividadReciente[];
  limit?: number;
}) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border-subtle px-6 py-4">
        <SectionHeader
          title="Actividad reciente"
          href="/operar?tab=movimientos"
          linkLabel="Ver historial"
          className="mb-0"
        />
      </div>
      <ul>
        {items.slice(0, limit).map((item, i) => {
          const cfg = tipoConfig[item.tipo];
          return (
            <li
              key={item.id}
              className={cn(
                "flex items-center gap-4 px-6 py-4 transition-colors hover:bg-surface-muted/40",
                i > 0 && "border-t border-border-subtle",
              )}
            >
              <IconBox icon={cfg.icon} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">
                  {item.descripcion}
                </p>
                <p className="text-xs text-faint">
                  {cfg.label} · {item.fecha}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <p
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    item.esEgreso ? "text-ink" : "text-success",
                  )}
                >
                  {item.esEgreso ? "−" : "+"}
                  {formatMonto(item.monto)}
                </p>
                <Badge variant={estadoVariant[item.estado]}>
                  {estadoLabel[item.estado]}
                </Badge>
              </div>
            </li>
          );
        })}
      </ul>
      {items.length > limit && (
        <div className="border-t border-border-subtle px-6 py-3">
          <Link
            href="/operar?tab=movimientos"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver toda la actividad
          </Link>
        </div>
      )}
    </Card>
  );
}
