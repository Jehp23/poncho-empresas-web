"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { PendienteConciliacion } from "../../domain/pendientes";
import { MOCK_PENDIENTES_CONCILIAR } from "../../domain/pendientes";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { SectionHeader } from "@/shared/ui/section-header";
import { DetailRow, useUiFeedback } from "@/shared/ui/ui-feedback";
import { formatMonto } from "@/shared/lib/format";

export function PendientesConciliar({
  items = MOCK_PENDIENTES_CONCILIAR,
}: {
  items?: PendienteConciliacion[];
}) {
  const { confirm, toast, openDrawer } = useUiFeedback();
  const [pendientes, setPendientes] = useState(items);

  function revisar(item: PendienteConciliacion) {
    openDrawer({
      title: item.descripcion,
      subtitle: `${item.banco} · ${item.fecha}`,
      content: (
        <div className="divide-y divide-border-subtle">
          <DetailRow label="Banco" value={item.banco} />
          <DetailRow label="Fecha" value={item.fecha} />
          <DetailRow
            label="Monto"
            value={item.monto > 0 ? formatMonto(item.monto) : "—"}
          />
          <DetailRow label="Estado" value={<Badge variant="warning">Sin categorizar</Badge>} />
          <p className="pt-4 text-xs text-faint">
            Demo — conciliación asistida por IA.
          </p>
        </div>
      ),
    });
  }

  function conciliar(item: PendienteConciliacion) {
    confirm({
      title: "Conciliar movimiento",
      description: `Demo — marcar "${item.descripcion}" como conciliado.`,
      confirmLabel: "Conciliar",
      onConfirm: () => {
        setPendientes((prev) => prev.filter((p) => p.id !== item.id));
        toast("Movimiento conciliado — demo", "success");
      },
    });
  }

  if (pendientes.length === 0) return null;

  return (
    <div className="mb-6">
      <SectionHeader
        title="Pendientes de conciliar"
        className="mb-3"
      />
      <Card padding="none" className="overflow-hidden">
        <ul className="divide-y divide-border-subtle">
          {pendientes.map((item) => (
            <li key={item.id}>
              <div className="flex flex-wrap items-center gap-3 px-5 py-3.5 sm:flex-nowrap">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {item.descripcion}
                  </p>
                  <p className="text-xs text-muted">
                    {item.banco} · {item.fecha}
                    {item.monto > 0 && ` · ${formatMonto(item.monto)}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => revisar(item)}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Revisar
                  </button>
                  <button
                    type="button"
                    onClick={() => conciliar(item)}
                    className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-hover"
                  >
                    Conciliar
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
