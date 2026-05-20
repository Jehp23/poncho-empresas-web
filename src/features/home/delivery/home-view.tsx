"use client";

import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { KpiCard, type KpiCardProps } from "@/shared/ui/kpi-card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";
import { formatMonto, formatPorcentaje } from "@/shared/lib/format";
import { AccountsSummary } from "./components/accounts-summary";
import { ActivityPreview } from "./components/activity-preview";
import { AdvisorNote } from "./components/advisor-note";
import { BalanceHero } from "./components/balance-hero";
import { CashflowPreview } from "./components/cashflow-preview";
import { ConsolidationCard } from "./components/consolidation-card";
import { EcheqsSummary } from "./components/echeqs-summary";
import { FinancingCard } from "./components/financing-card";
import { MoneyMarketCard } from "./components/money-market-card";
import {
  CollectionsCard,
  PaymentsCard,
} from "./components/payments-collections";

function buildKpiData(data: ReturnType<typeof useDashboardData>): KpiCardProps[] {
  const cuentaRemunerada = data.cuentas.find((c) => c.tipo === "remunerada");
  const echeqsTotal = data.echeqs.emitidosMonto + data.echeqs.recibidosMonto;
  const echeqsCount = data.echeqs.emitidosPendientes + data.echeqs.recibidosPorCobrar;

  return [
    {
      label:        "Saldo Total",
      value:        formatMonto(data.saldoTotal),
      change:       `▲ ${formatPorcentaje(data.variacionMes)} vs mes anterior`,
      changeColor:  "success" as const,
      accentColor:  "var(--pe-primary)",
    },
    {
      label:        "Cuenta Remunerada",
      value:        formatMonto(cuentaRemunerada?.saldo ?? 0),
      change:       "TNA 97.5% · FCI MM",
      changeColor:  "success" as const,
      accentColor:  "var(--pe-accent)",
    },
    {
      label:        "eCheqs Pendientes",
      value:        formatMonto(echeqsTotal),
      change:       `${data.echeqs.recibidosPorCobrar} recibidos · ${data.echeqs.emitidosPendientes} emitidos`,
      changeColor:  "muted" as const,
      accentColor:  "var(--pe-info)",
    },
    {
      label:        "Financiamiento",
      value:        data.financiamiento.score ? `Score ${data.financiamiento.score}` : "No iniciado",
      change:       `Paso ${data.financiamiento.pasoActual ?? 0}/${data.financiamiento.pasosTotal} · SGR`,
      changeColor:  data.financiamiento.score != null && data.financiamiento.score >= 70 ? "success" : "warning",
      accentColor:  "var(--pe-wallet)",
    },
  ];
}

function GridCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`h-full min-h-0 ${className}`}>{children}</div>;
}

export function HomeView() {
  const data = useDashboardData();
  const kpis = buildKpiData(data);

  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="Dashboard"
        subtitulo={`Resumen financiero · ${data.empresa.nombre}`}
      />

      <div className="mb-6">
        <AdvisorNote asesor={data.asesor} />
      </div>

      {/* ── KPI row ── */}
      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            changeColor={kpi.changeColor}
            accentColor={kpi.accentColor}
          />
        ))}
      </div>

      {/* ── Resto del dashboard ── */}
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <GridCell className="lg:col-span-8">
            <BalanceHero
              saldoTotal={data.saldoTotal}
              variacionMes={data.variacionMes}
            />
          </GridCell>
          <GridCell className="lg:col-span-4">
            <AccountsSummary cuentas={data.cuentas} />
          </GridCell>
        </div>

        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <GridCell>
            <EcheqsSummary echeqs={data.echeqs} />
          </GridCell>
          <GridCell>
            <PaymentsCard pagos={data.proximosPagos} />
          </GridCell>
          <GridCell>
            <CollectionsCard cobros={data.facturasPorCobrar} />
          </GridCell>
          <GridCell>
            <MoneyMarketCard />
          </GridCell>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <GridCell className="lg:col-span-7">
            <CashflowPreview />
          </GridCell>
          <GridCell className="lg:col-span-5">
            <ConsolidationCard />
          </GridCell>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <GridCell className="lg:col-span-4">
            <FinancingCard data={data.financiamiento} />
          </GridCell>
          <GridCell className="lg:col-span-8">
            <ActivityPreview items={data.actividad} />
          </GridCell>
        </div>
      </div>
    </PageShell>
  );
}
