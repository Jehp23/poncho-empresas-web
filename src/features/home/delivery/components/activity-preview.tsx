import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { ActividadReciente, EstadoActividad } from "@/shared/types/app";
import { Badge } from "@/shared/ui/badge";
import { IconBox } from "@/shared/ui/icon-box";
import { SectionHeader } from "@/shared/ui/section-header";
import { DashboardCard } from "@/shared/ui/dashboard-card";
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
  completado: "Completed",
  pendiente: "Pending",
  en_revision: "In review",
  requiere_atencion: "Needs attention",
};

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "transferencia", label: "Transferencias" },
  { id: "deposito", label: "Depósitos" },
  { id: "echeq", label: "eCheqs" },
  { id: "inversion", label: "Inversiones" },
] as const;

export function ActivityPreview({
  items,
  limit = 5,
}: {
  items: ActividadReciente[];
  limit?: number;
}) {
  return (
    <DashboardCard padding="none" className="overflow-hidden">
      <div className="border-b border-border-subtle px-5 py-4 sm:px-6">
        <SectionHeader
          title="Actividad reciente"
          href="/movimientos"
          linkLabel="Ver historial"
          className="mb-3"
        />
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {FILTERS.map((f, i) => (
            <span
              key={f.id}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                i === 0
                  ? "bg-primary-soft text-primary"
                  : "bg-surface-muted text-muted",
              )}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>
      <ul className="min-w-0">
        {items.slice(0, limit).map((item, i) => {
          const cfg = tipoConfig[item.tipo];
          return (
            <li
              key={item.id}
              className={cn(
                "flex min-w-0 items-center gap-3 px-5 py-4 sm:gap-4 sm:px-6",
                i > 0 && "border-t border-border-subtle",
              )}
            >
              <IconBox icon={cfg.icon} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">
                  {item.descripcion}
                </p>
                <p className="truncate text-xs text-faint">
                  {cfg.label} · {item.fecha}
                </p>
              </div>
              <div className="flex w-[5.5rem] shrink-0 flex-col items-end gap-1 sm:w-auto">
                <p
                  className={cn(
                    "max-w-full truncate text-xs font-semibold tabular-nums sm:text-sm",
                    item.esEgreso ? "text-ink" : "text-success",
                  )}
                >
                  {item.esEgreso ? "−" : "+"}
                  {formatMonto(item.monto)}
                </p>
                <Badge variant={estadoVariant[item.estado]} className="max-w-full truncate">
                  {estadoLabel[item.estado]}
                </Badge>
              </div>
            </li>
          );
        })}
      </ul>
      {items.length > limit && (
        <div className="border-t border-border-subtle px-5 py-3 sm:px-6">
          <Link
            href="/movimientos"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver toda la actividad
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
