import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import type { ResumenEcheqs } from "@/shared/types/app";
import { IconBox } from "@/shared/ui/icon-box";
import { SectionHeader } from "@/shared/ui/section-header";
import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardFooter,
} from "@/shared/ui/dashboard-card";
import { formatMonto } from "@/shared/lib/format";

export function EcheqsSummary({ echeqs }: { echeqs: ResumenEcheqs }) {
  return (
    <DashboardCard>
      <SectionHeader title="eCheqs" href="/echeqs" linkLabel="Gestionar" />
      <DashboardCardBody className="gap-2">
        <div className="rounded-xl bg-surface-muted/80 px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <IconBox icon={ArrowUpRight} size="sm" tone="primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">Emitidos</p>
                <p className="text-xs text-faint">
                  {echeqs.emitidosPendientes} pendientes
                </p>
              </div>
            </div>
            <p
              className="shrink-0 text-right text-sm font-semibold leading-tight tabular-nums text-ink"
              title={formatMonto(echeqs.emitidosMonto)}
            >
              {formatMonto(echeqs.emitidosMonto)}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-primary/10 bg-primary-soft/30 px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <IconBox icon={ArrowDownLeft} size="sm" tone="success" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">Recibidos</p>
                <p className="text-xs font-medium text-primary">
                  {echeqs.recibidosPorCobrar} por cobrar
                </p>
              </div>
            </div>
            <p
              className="shrink-0 text-right text-sm font-semibold leading-tight tabular-nums text-primary"
              title={formatMonto(echeqs.recibidosMonto)}
            >
              {formatMonto(echeqs.recibidosMonto)}
            </p>
          </div>
        </div>
      </DashboardCardBody>
      <DashboardCardFooter>
        <Link
          href="/echeqs"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Ver eCheqs
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </DashboardCardFooter>
    </DashboardCard>
  );
}
