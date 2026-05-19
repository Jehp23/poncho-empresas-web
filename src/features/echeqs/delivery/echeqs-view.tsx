"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FileText, Inbox, Send } from "lucide-react";
import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { EmptyState } from "@/shared/ui/empty-state";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";
import { formatMonto } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";

const TABS = [
  { id: "emitidos", label: "Emitidos" },
  { id: "recibidos", label: "Recibidos" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const MOCK_EMITIDOS = [
  { id: "e1", beneficiario: "Globant SA", monto: 125_000, vence: "25 may", estado: "Pendiente" },
  { id: "e2", beneficiario: "Proveedor Logística", monto: 48_000, vence: "30 may", estado: "Pendiente" },
];

const MOCK_RECIBIDOS = [
  { id: "r1", emisor: "Retail Max", monto: 68_400, vence: "22 may", estado: "Por cobrar" },
  { id: "r2", emisor: "Servicios Andinos", monto: 33_200, vence: "28 may", estado: "Por cobrar" },
];

export function EcheqsView() {
  const data = useDashboardData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab: TabId =
    searchParams.get("tab") === "recibidos" ? "recibidos" : "emitidos";

  const setTab = useCallback(
    (id: TabId) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", id);
      router.push(`/echeqs?${params.toString()}`);
    },
    [router, searchParams],
  );

  const items = tab === "emitidos" ? MOCK_EMITIDOS : MOCK_RECIBIDOS;

  return (
    <PageShell
      usuario={data.usuario}
      titulo="eCheqs"
      subtitulo="Emitidos y recibidos en un solo lugar."
      ancho="completo"
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card padding="md">
          <p className="text-label">Emitidos pendientes</p>
          <p className="font-display mt-1 text-2xl font-semibold text-primary">
            {formatMonto(data.echeqs.emitidosMonto)}
          </p>
          <p className="text-xs text-faint">{data.echeqs.emitidosPendientes} cheques</p>
        </Card>
        <Card padding="md">
          <p className="text-label">Recibidos por cobrar</p>
          <p className="font-display mt-1 text-2xl font-semibold text-amber-900">
            {formatMonto(data.echeqs.recibidosMonto)}
          </p>
          <p className="text-xs text-faint">{data.echeqs.recibidosPorCobrar} cheques</p>
        </Card>
      </div>

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

      {items.length === 0 ? (
        <EmptyState
          icon={tab === "emitidos" ? Send : Inbox}
          title={tab === "emitidos" ? "Sin eCheqs emitidos" : "Sin eCheqs recibidos"}
          description="Cuando operes con cheques electrónicos, aparecerán acá."
          actionLabel="Emitir eCheq"
          actionHref="/echeqs?tab=emitidos"
        />
      ) : (
        <Card padding="none" className="overflow-hidden">
          <ul>
            {items.map((item, i) => (
              <li
                key={item.id}
                className={cn(
                  "flex items-center gap-4 px-6 py-4",
                  i > 0 && "border-t border-border-subtle",
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {"beneficiario" in item ? item.beneficiario : item.emisor}
                  </p>
                  <p className="text-xs text-faint">
                    Vence {item.vence} · {item.estado}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums text-ink">
                  {formatMonto(item.monto)}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="mt-6">
        <Button variant="accent">
          <Send className="h-4 w-4" />
          {tab === "emitidos" ? "Emitir eCheq" : "Endosar recibido"}
        </Button>
      </div>
    </PageShell>
  );
}
