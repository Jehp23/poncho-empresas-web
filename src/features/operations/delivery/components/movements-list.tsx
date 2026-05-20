"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { ActividadReciente, EstadoActividad } from "@/shared/types/app";
import { Badge } from "@/shared/ui/badge";
import { EmptyState } from "@/shared/ui/empty-state";
import { FilterChips } from "@/shared/ui/filter-chips";
import { IconBox } from "@/shared/ui/icon-box";
import { Card } from "@/shared/ui/card";
import { DetailRow, useUiFeedback } from "@/shared/ui/ui-feedback";
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
  { id: "deposito", label: "Depósitos" },
  { id: "echeq", label: "eCheqs" },
  { id: "inversion", label: "Inversiones" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export function MovementsList({ items }: { items: ActividadReciente[] }) {
  const { openDrawer } = useUiFeedback();
  const [filtro, setFiltro] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (filtro === "all") return items;
    return items.filter((item) => item.tipo === filtro);
  }, [items, filtro]);

  function verDetalle(item: ActividadReciente) {
    const cfg = tipoConfig[item.tipo];
    openDrawer({
      title: item.descripcion,
      subtitle: `${cfg.label} · ${item.fecha}`,
      content: (
        <div className="divide-y divide-border-subtle">
          <DetailRow label="Tipo" value={cfg.label} />
          <DetailRow label="Fecha" value={item.fecha} />
          <DetailRow
            label="Monto"
            value={
              <span className={item.esEgreso ? "text-ink" : "text-success"}>
                {item.esEgreso ? "−" : "+"}
                {formatMonto(item.monto)}
              </span>
            }
          />
          <DetailRow
            label="Estado"
            value={
              <Badge variant={estadoVariant[item.estado]}>
                {estadoLabel[item.estado]}
              </Badge>
            }
          />
          <DetailRow label="Referencia" value={`#${item.id.toUpperCase()}`} />
          <p className="pt-4 text-xs text-faint">
            Demo — detalle simulado para pruebas de flujo.
          </p>
        </div>
      ),
    });
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border-subtle px-5 py-4">
        <FilterChips items={FILTERS} active={filtro} onChange={setFiltro} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ArrowLeftRight}
          title="Sin movimientos"
          description="No hay operaciones en esta categoría."
          className="border-none bg-transparent"
        />
      ) : (
        <ul>
          {filtered.map((item, i) => {
            const cfg = tipoConfig[item.tipo];
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => verDetalle(item)}
                  className={cn(
                    "flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-surface-muted/40",
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
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
