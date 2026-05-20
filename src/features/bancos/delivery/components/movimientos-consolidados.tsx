"use client";

import { useMemo, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { formatMonto } from "@/shared/lib/format";
import { Badge } from "@/shared/ui/badge";
import { EmptyState } from "@/shared/ui/empty-state";
import { FilterChips } from "@/shared/ui/filter-chips";
import { FileText } from "lucide-react";
import type { MovimientoBanco } from "../../domain/types";
import { DetailRow, useUiFeedback } from "@/shared/ui/ui-feedback";

const FILTROS = [
  { id: "todos", label: "Todos" },
  { id: "Galicia", label: "Galicia" },
  { id: "Macro", label: "Macro" },
  { id: "Nación", label: "Nación" },
  { id: "Poncho Wallet", label: "Wallet" },
] as const;

type FiltroId = (typeof FILTROS)[number]["id"];

const estadoBadge = {
  completado: { label: "Acreditado", variant: "success-vivid" as const },
  pendiente: { label: "Pendiente", variant: "warning" as const },
  en_revision: { label: "En revisión", variant: "ai" as const },
} as const;

interface Props {
  movimientos: MovimientoBanco[];
}

export function MovimientosConsolidados({ movimientos }: Props) {
  const { openDrawer } = useUiFeedback();
  const [filtro, setFiltro] = useState<FiltroId>("todos");

  const filtered = useMemo(
    () =>
      movimientos.filter(
        (m) => filtro === "todos" || m.bancoNombre === filtro,
      ),
    [movimientos, filtro],
  );

  function verDetalle(m: MovimientoBanco) {
    const badge = estadoBadge[m.estado];
    openDrawer({
      title: m.descripcion,
      subtitle: `${m.bancoNombre} · ${m.fecha}`,
      content: (
        <div className="divide-y divide-border-subtle">
          <DetailRow label="Banco" value={m.bancoNombre} />
          <DetailRow label="Fecha" value={m.fecha} />
          <DetailRow label="Categoría" value={m.categoria} />
          <DetailRow
            label="Monto"
            value={
              m.monto > 0 ? (
                <span className={m.tipo === "credito" ? "text-success" : "text-danger"}>
                  {m.tipo === "credito" ? "+" : "−"}
                  {formatMonto(m.monto)}
                </span>
              ) : (
                "—"
              )
            }
          />
          <DetailRow
            label="Estado"
            value={<Badge variant={badge.variant}>{badge.label}</Badge>}
          />
          <p className="pt-4 text-xs text-faint">
            Demo — detalle simulado para pruebas de conciliación.
          </p>
        </div>
      ),
    });
  }

  return (
    <div className="overflow-hidden rounded-card border border-border-subtle bg-surface shadow-card">
      <div className="border-b border-border-subtle px-5 py-4">
        <p className="text-section-title">Movimientos</p>
        <p className="mt-0.5 text-xs text-muted">Últimos movimientos de todas tus cuentas</p>
        <div className="mt-4">
          <FilterChips items={FILTROS} active={filtro} onChange={setFiltro} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Sin movimientos"
          description="No hay movimientos para el filtro seleccionado."
          className="m-4 border-none bg-transparent"
        />
      ) : (
        <ul className="divide-y divide-border-subtle">
          {filtered.map((m) => {
            const badge = estadoBadge[m.estado];
            const esCredito = m.tipo === "credito";

            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => verDetalle(m)}
                  className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5 text-left transition-colors hover:bg-surface-muted/30 sm:flex-nowrap"
                >
                <div className="w-24 shrink-0 text-xs text-muted">{m.fecha}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink">{m.descripcion}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {m.bancoNombre}
                    {m.categoria ? ` · ${m.categoria}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:ml-auto">
                  {m.monto > 0 ? (
                    <span
                      className={cn(
                        "font-display text-sm font-bold tabular-nums",
                        esCredito ? "text-success" : "text-danger",
                      )}
                    >
                      {esCredito ? "+" : "−"}
                      {formatMonto(m.monto)}
                    </span>
                  ) : (
                    <span className="text-sm text-muted">—</span>
                  )}
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="border-t border-border-subtle bg-surface-muted/30 px-5 py-3">
        <span className="text-xs text-muted">
          {filtered.length} movimientos · Mayo 2026
        </span>
      </div>
    </div>
  );
}
