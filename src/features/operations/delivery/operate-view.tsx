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

function parseTab(tab: string | null): TabId {
  if (tab === "transferir" || tab === "depositar") return tab;
  return "movimientos";
}

export function OperateView() {
  const data = useDashboardData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = parseTab(searchParams.get("tab"));

  const setTab = useCallback(
    (id: TabId) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id === "movimientos") {
        params.delete("tab");
      } else {
        params.set("tab", id);
      }
      const qs = params.toString();
      router.push(qs ? `/operar?${qs}` : "/operar");
    },
    [router, searchParams],
  );

  return (
    <PageShell
      usuario={data.usuario}
      titulo="Operar"
      subtitulo="Movimientos, transferencias y depósitos en un solo lugar."
      ancho="completo"
    >
      <div className="mb-6 flex gap-1 rounded-full border border-primary/15 bg-primary-soft/40 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all",
              tab === t.id
                ? "gradient-primary text-white shadow-[0_4px_12px_var(--pe-primary-glow)]"
                : "text-muted hover:bg-surface/80 hover:text-primary",
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
