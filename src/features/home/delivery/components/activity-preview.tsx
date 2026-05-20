"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { ActividadReciente, EstadoActividad } from "@/shared/types/app";
import { Badge } from "@/shared/ui/badge";
import { FilterChips } from "@/shared/ui/filter-chips";
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
  completado: "Completado",
  pendiente: "Pendiente",
  en_revision: "En revisión",
  requiere_atencion: "Requiere atención",
};

const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "transferencia", label: "Transferencias" },
  { id: "echeq", label: "eCheqs" },
  { id: "inversion", label: "Inversiones" },
  { id: "deposito", label: "Depósitos" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export function ActivityPreview({
  items,
  limit = 5,
}: {
  items: ActividadReciente[];
  limit?: number;
}) {
  const [filtro, setFiltro] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (filtro === "all") return items;
    return items.filter((item) => item.tipo === filtro);
  }, [items, filtro]);

  const visible = filtered.slice(0, limit);

  return (
    <DashboardCard padding="none" className="overflow-hidden">
      <div className="border-b border-border-subtle px-5 py-4 sm:px-6">
        <SectionHeader
          title="Actividad reciente"
          href="/operar"
          linkLabel="Ver historial"
          className="mb-3"
        />
        <FilterChips items={FILTERS} active={filtro} onChange={setFiltro} />
      </div>

      {visible.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted sm:px-6">
          No hay movimientos en esta categoría.
        </p>
      ) : (
        <ul className="min-w-0">
          {visible.map((item, i) => {
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
      )}

      {filtered.length > limit && (
        <div className="border-t border-border-subtle px-5 py-3 sm:px-6">
          <Link
            href="/operar"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver toda la actividad
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
