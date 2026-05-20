"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { FileText, Inbox, Send } from "lucide-react";
import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import {
  filterEcheqs,
  MOCK_ECHEQS_EMITIDOS,
  MOCK_ECHEQS_RECIBIDOS,
  type EcheqEstado,
  type EcheqItem,
} from "../domain/mock";
import { EmptyState } from "@/shared/ui/empty-state";
import { Card } from "@/shared/ui/card";
import { Badge, type BadgeVariant } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { FilterChips } from "@/shared/ui/filter-chips";
import { KpiCard } from "@/shared/ui/kpi-card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";
import { TabBar } from "@/shared/ui/tab-bar";
import { DetailRow, useUiFeedback } from "@/shared/ui/ui-feedback";
import { EmitirEcheqModal } from "./components/emitir-echeq-modal";
import { formatMonto } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

const TABS = [
  { id: "emitidos", label: "Emitidos" },
  { id: "recibidos", label: "Recibidos" },
] as const;

const FILTROS = [
  { id: "todos", label: "Todos" },
  { id: "pendientes", label: "Pendientes" },
  { id: "acreditados", label: "Acreditados" },
  { id: "vencidos", label: "Vencidos" },
] as const;

type TabId = (typeof TABS)[number]["id"];
type FiltroId = (typeof FILTROS)[number]["id"];

const estadoBadge: Record<EcheqEstado, { variant: BadgeVariant; label: string }> = {
  pendiente: { variant: "warning", label: "Pendiente" },
  por_cobrar: { variant: "info", label: "Por cobrar" },
  acreditado: { variant: "success-vivid", label: "Acreditado" },
  vencido: { variant: "danger", label: "Vencido" },
  en_revision: { variant: "default", label: "En revisión" },
};

function EcheqTable({
  items,
  tab,
  onVerDetalle,
  onAccionSecundaria,
}: {
  items: EcheqItem[];
  tab: TabId;
  onVerDetalle: (item: EcheqItem) => void;
  onAccionSecundaria: (item: EcheqItem) => void;
}) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border-subtle bg-surface-muted/50">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                N° ECHEQ
              </th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                {tab === "emitidos" ? "Beneficiario" : "Emisor"}
              </th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                Monto
              </th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                Vencimiento
              </th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                Estado
              </th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const badge = estadoBadge[item.estado];
              return (
                <tr
                  key={item.id}
                  className="border-b border-border-subtle last:border-0 transition-colors hover:bg-surface-muted/30"
                >
                  <td className="px-5 py-4 font-display font-semibold text-ink">
                    {item.numero}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{item.contraparte}</p>
                    <p className="text-xs text-faint">CUIT {item.cuit}</p>
                  </td>
                  <td
                    className={cn(
                      "px-5 py-4 font-display font-bold tabular-nums",
                      item.esEmitido ? "text-danger" : "text-success",
                    )}
                  >
                    {item.esEmitido ? "−" : "+"}
                    {formatMonto(item.monto)}
                  </td>
                  <td className="px-5 py-4 text-muted">{item.vence}</td>
                  <td className="px-5 py-4">
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        className="h-8 px-3 text-xs"
                        onClick={() => onVerDetalle(item)}
                      >
                        Ver detalle
                      </Button>
                      {tab === "recibidos" && (
                        <Button
                          variant="ghost"
                          className="h-8 px-3 text-xs"
                          onClick={() => onAccionSecundaria(item)}
                        >
                          Endosar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function EcheqsView() {
  const data = useDashboardData();
  const { confirm, toast, openDrawer } = useUiFeedback();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab: TabId =
    searchParams.get("tab") === "recibidos" ? "recibidos" : "emitidos";
  const [filtro, setFiltro] = useState<FiltroId>("todos");
  const [emitOpen, setEmitOpen] = useState(false);

  const setTab = useCallback(
    (id: TabId) => {
      setFiltro("todos");
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", id);
      router.push(`/echeqs?${params.toString()}`);
    },
    [router, searchParams],
  );

  const source = tab === "emitidos" ? MOCK_ECHEQS_EMITIDOS : MOCK_ECHEQS_RECIBIDOS;
  const items = useMemo(() => filterEcheqs(source, filtro), [source, filtro]);

  function emitirEcheq() {
    setEmitOpen(true);
  }

  function verDetalle(item: EcheqItem) {
    const badge = estadoBadge[item.estado];
    openDrawer({
      title: item.numero,
      subtitle: item.contraparte,
      content: (
        <div className="divide-y divide-border-subtle">
          <DetailRow label="Contraparte" value={item.contraparte} />
          <DetailRow label="CUIT" value={item.cuit} />
          <DetailRow
            label="Monto"
            value={
              <span className={item.esEmitido ? "text-danger" : "text-success"}>
                {item.esEmitido ? "−" : "+"}
                {formatMonto(item.monto)}
              </span>
            }
          />
          <DetailRow label="Emisión" value={item.emision} />
          <DetailRow label="Vencimiento" value={item.vence} />
          <DetailRow
            label="Estado"
            value={<Badge variant={badge.variant}>{badge.label}</Badge>}
          />
          <DetailRow label="Tipo" value={item.esEmitido ? "Emitido" : "Recibido"} />
          <p className="pt-4 text-xs text-faint">
            Demo — detalle simulado para pruebas de flujo.
          </p>
        </div>
      ),
    });
  }

  function endosar(item: EcheqItem) {
    confirm({
      title: "Endosar eCheq",
      description: `Demo — endosar ${item.numero} por ${formatMonto(item.monto)} a tercero.`,
      confirmLabel: "Endosar",
      onConfirm: () => toast("eCheq endosado — demo", "success"),
    });
  }

  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="eCheqs"
        subtitulo="Emitidos y recibidos en un solo lugar."
        accion={
          <Button onClick={emitirEcheq}>
            <Send className="h-4 w-4" />
            Emitir eCheq
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Emitidos pendientes"
          value={formatMonto(data.echeqs.emitidosMonto)}
          change={`${data.echeqs.emitidosPendientes} cheques por pagar`}
          changeColor="warning"
          accentColor="var(--pe-info)"
        />
        <KpiCard
          label="Recibidos por cobrar"
          value={formatMonto(data.echeqs.recibidosMonto)}
          change={`${data.echeqs.recibidosPorCobrar} cheques activos`}
          changeColor="success"
          accentColor="var(--pe-success-vivid)"
        />
      </div>

      <div className="mb-4">
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>

      <div className="mb-4">
        <FilterChips items={FILTROS} active={filtro} onChange={setFiltro} />
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={tab === "emitidos" ? Send : Inbox}
          title={tab === "emitidos" ? "Sin eCheqs emitidos" : "Sin eCheqs recibidos"}
          description="Cuando operes con cheques electrónicos, aparecerán acá."
          actionLabel="Emitir eCheq"
          onAction={emitirEcheq}
        />
      ) : (
        <EcheqTable
          items={items}
          tab={tab}
          onVerDetalle={verDetalle}
          onAccionSecundaria={endosar}
        />
      )}

      <EmitirEcheqModal open={emitOpen} onClose={() => setEmitOpen(false)} />
    </PageShell>
  );
}
