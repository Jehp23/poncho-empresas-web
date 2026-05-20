"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { KpiCard } from "@/shared/ui/kpi-card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";
import { SectionHeader } from "@/shared/ui/section-header";
import { TabBar } from "@/shared/ui/tab-bar";
import { formatMonto } from "@/shared/lib/format";
import { AccountsPanel } from "./components/accounts-panel";
import { DepositForm } from "./components/deposit-form";
import { MovementsList } from "./components/movements-list";
import { TransferForm } from "./components/transfer-form";

const TABS = [
  { id: "movimientos", label: "Movimientos" },
  { id: "transferir", label: "Transferir" },
  { id: "depositar", label: "Depositar" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type OperateViewProps = {
  defaultTab?: TabId;
};

function parseTab(tab: string | null, fallback: TabId): TabId {
  if (tab === "transferir" || tab === "depositar" || tab === "movimientos") return tab;
  return fallback;
}

export function OperateView({ defaultTab = "movimientos" }: OperateViewProps) {
  const data = useDashboardData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = parseTab(searchParams.get("tab"), defaultTab);

  const setTab = useCallback(
    (id: TabId) => {
      router.push(`/operar?tab=${id}`);
    },
    [router],
  );

  const cuentaOperativa = useMemo(
    () => data.cuentas.find((c) => c.tipo === "operativa"),
    [data.cuentas],
  );

  const ingresosMes = useMemo(
    () =>
      data.actividad
        .filter((a) => !a.esEgreso)
        .reduce((sum, a) => sum + a.monto, 0),
    [data.actividad],
  );

  const egresosMes = useMemo(
    () =>
      data.actividad
        .filter((a) => a.esEgreso)
        .reduce((sum, a) => sum + a.monto, 0),
    [data.actividad],
  );

  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="Operar"
        subtitulo="Movimientos, transferencias y depósitos de tu cuenta Poncho."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Saldo operativo"
          value={formatMonto(cuentaOperativa?.saldo ?? 0)}
          change={cuentaOperativa?.detalle ?? "Cuenta principal"}
          changeColor="muted"
          accentColor="var(--pe-primary)"
        />
        <KpiCard
          label="Ingresos (mes)"
          value={formatMonto(ingresosMes)}
          change={`${data.actividad.filter((a) => !a.esEgreso).length} movimientos`}
          changeColor="success"
          accentColor="var(--pe-success-vivid)"
        />
        <KpiCard
          label="Egresos (mes)"
          value={formatMonto(egresosMes)}
          change={`${data.actividad.filter((a) => a.esEgreso).length} movimientos`}
          changeColor="muted"
          accentColor="var(--pe-warning)"
        />
      </div>

      <div className="mb-6">
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "movimientos" && (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader title="Últimos movimientos" />
            <MovementsList items={data.actividad} />
          </div>
          <div className="lg:col-span-4">
            <SectionHeader title="Tus cuentas" />
            <AccountsPanel cuentas={data.cuentas} />
          </div>
        </div>
      )}

      {tab === "transferir" && (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <TransferForm cuentas={data.cuentas} />
          </div>
          <div className="lg:col-span-5">
            <SectionHeader title="Cuentas disponibles" />
            <AccountsPanel cuentas={data.cuentas} />
          </div>
        </div>
      )}

      {tab === "depositar" && (
        <div className="max-w-xl">
          <DepositForm />
        </div>
      )}
    </PageShell>
  );
}
