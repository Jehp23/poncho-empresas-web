import type { FacturaPorCobrar, Vencimiento } from "@/shared/types/app";
import { SectionHeader } from "@/shared/ui/section-header";
import {
  DashboardCard,
  DashboardCardBody,
} from "@/shared/ui/dashboard-card";
import { formatMonto } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

const LIST_MIN_ITEMS = 3;

export function PaymentsCard({ pagos }: { pagos: Vencimiento[] }) {
  const items = pagos.slice(0, LIST_MIN_ITEMS);

  return (
    <DashboardCard>
      <SectionHeader title="Próximos pagos" href="/movimientos" />
      <DashboardCardBody>
        <ul className="flex min-h-[8.5rem] flex-col justify-start gap-2">
          {items.map((p) => (
            <li
              key={p.id}
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl bg-surface-muted/70 px-3 py-2.5"
            >
              <span className="min-w-0 flex-1 truncate text-sm text-muted">
                {p.descripcion}
              </span>
              <span
                className={cn(
                  "shrink-0 whitespace-nowrap text-xs font-semibold tabular-nums",
                  p.urgente ? "text-danger" : "text-muted",
                )}
              >
                {p.fecha}
              </span>
            </li>
          ))}
        </ul>
      </DashboardCardBody>
    </DashboardCard>
  );
}

export function CollectionsCard({ cobros }: { cobros: FacturaPorCobrar[] }) {
  const items = cobros.slice(0, LIST_MIN_ITEMS);

  return (
    <DashboardCard>
      <SectionHeader title="Por cobrar" href="/movimientos" />
      <DashboardCardBody>
        <ul className="flex min-h-[8.5rem] flex-col justify-start gap-2">
          {items.map((f) => (
            <li
              key={f.id}
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl bg-surface-muted/70 px-3 py-2.5"
            >
              <span className="min-w-0 flex-1 truncate text-sm text-muted">
                {f.cliente}
              </span>
              <div className="shrink-0 text-right">
                <p className="whitespace-nowrap text-xs font-semibold tabular-nums text-ink sm:text-sm">
                  {formatMonto(f.monto)}
                </p>
                <p className="whitespace-nowrap text-[10px] text-faint">vence {f.vence}</p>
              </div>
            </li>
          ))}
        </ul>
      </DashboardCardBody>
    </DashboardCard>
  );
}
