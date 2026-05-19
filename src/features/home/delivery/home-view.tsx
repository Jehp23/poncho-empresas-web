"use client";

import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { AccountsSummary } from "./components/accounts-summary";
import { ActivityPreview } from "./components/activity-preview";
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

  return (
    <PageShell usuario={data.usuario} ancho="completo">
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
