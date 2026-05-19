"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { cn } from "@/shared/lib/cn";
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
      const routes: Record<TabId, string> = {
        movimientos: "/movimientos",
        transferir: "/transferencias",
        depositar: "/depositos",
      };
      router.push(routes[id]);
    },
    [router],
  );

  return (
    <PageShell
      usuario={data.usuario}
      titulo={
        defaultTab === "transferir"
          ? "Transferencias"
          : defaultTab === "depositar"
            ? "Depósitos"
            : "Movimientos"
      }
      subtitulo="Historial, transferencias y depósitos de tu cuenta operativa."
      ancho="completo"
    >
      <div className="mb-6 flex gap-1 rounded-full border border-border-subtle bg-surface p-1 shadow-sm">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id
                ? "bg-primary-soft text-primary"
                : "text-muted hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "movimientos" && (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MovementsList items={data.actividad} />
          </div>
          <div className="lg:col-span-4">
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
