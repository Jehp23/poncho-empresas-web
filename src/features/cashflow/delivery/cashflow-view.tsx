"use client";

import { Download, FileSpreadsheet } from "lucide-react";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import {
  CASHFLOW_TABLE,
  cashflowKpis,
} from "../domain/mock";
import { CashflowChart } from "./components/cashflow-chart";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { KpiCard } from "@/shared/ui/kpi-card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";
import { formatMonto } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

const kpis = cashflowKpis(
  CASHFLOW_TABLE.map(({ mes, ingresos, egresos }) => ({ mes, ingresos, egresos })),
);

export function CashflowView() {
  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="CashFlow"
        subtitulo="Proyección de ingresos y egresos a 12 meses."
        accion={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="h-9 px-4 text-xs">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Exportar Excel
            </Button>
            <Button variant="secondary" className="h-9 px-4 text-xs">
              <Download className="h-3.5 w-3.5" />
              Exportar PDF
            </Button>
          </div>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Ingreso promedio"
          value={formatMonto(kpis.promedioIngresos)}
          change="Por mes · proyección"
          changeColor="success"
          accentColor="var(--pe-success-vivid)"
        />
        <KpiCard
          label="Egreso promedio"
          value={formatMonto(kpis.promedioEgresos)}
          change="Por mes · proyección"
          changeColor="muted"
          accentColor="var(--pe-accent)"
        />
        <KpiCard
          label="Saldo neto promedio"
          value={formatMonto(kpis.netoPromedio)}
          change="Ingresos − egresos"
          changeColor={kpis.netoPromedio >= 0 ? "success" : "danger"}
          accentColor="var(--pe-primary)"
        />
        <KpiCard
          label="Saldo acumulado"
          value={formatMonto(kpis.saldoAcumulado)}
          change="Al cierre del período"
          changeColor="info"
          accentColor="var(--pe-info)"
        />
      </div>

      <Card padding="lg" className="mb-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-section-title">Proyección estimada</p>
            <p className="mt-0.5 text-xs text-muted">Jun 2026 — May 2027</p>
          </div>
          <Badge variant="ai">Sincronizado con operaciones</Badge>
        </div>
        <CashflowChart height="md" />
      </Card>

      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-border-subtle px-5 py-4">
          <p className="text-section-title">Detalle mensual</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-muted/50">
                {["Mes", "Ingresos", "Egresos", "Saldo neto", "Saldo acum."].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CASHFLOW_TABLE.map((row, i) => (
                <tr
                  key={row.mes}
                  className="border-b border-border-subtle last:border-0 hover:bg-surface-muted/30"
                >
                  <td className="px-5 py-4 font-semibold text-ink">
                    {row.mes} {i >= 7 ? "2027" : "2026"}
                  </td>
                  <td className="px-5 py-4 font-semibold text-success">
                    +{formatMonto(row.ingresos)}
                  </td>
                  <td className="px-5 py-4 font-semibold text-danger">
                    −{formatMonto(row.egresos)}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-4 font-display font-bold",
                      row.neto >= 0 ? "text-success" : "text-danger",
                    )}
                  >
                    {row.neto >= 0 ? "+" : ""}
                    {formatMonto(row.neto)}
                  </td>
                  <td className="px-5 py-4 font-display font-bold text-ink">
                    {formatMonto(row.acumulado)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
