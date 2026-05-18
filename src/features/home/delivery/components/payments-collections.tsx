import Link from "next/link";
import type { FacturaPorCobrar, Vencimiento } from "@/shared/types/app";
import { Card } from "@/shared/ui/card";
import { SectionHeader } from "@/shared/ui/section-header";
import { formatMonto } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

export function PaymentsCard({ pagos }: { pagos: Vencimiento[] }) {
  return (
    <Card padding="lg" className="flex h-full flex-col">
      <SectionHeader title="Próximos pagos" href="/movimientos" />
      <ul className="flex flex-1 flex-col gap-2">
        {pagos.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted/70 px-3 py-2.5"
          >
            <span className="truncate text-sm text-muted">{p.descripcion}</span>
            <span
              className={cn(
                "shrink-0 text-xs font-semibold tabular-nums",
                p.urgente ? "text-danger" : "text-muted",
              )}
            >
              {p.fecha}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function CollectionsCard({ cobros }: { cobros: FacturaPorCobrar[] }) {
  return (
    <Card padding="lg" className="flex h-full flex-col">
      <SectionHeader title="Por cobrar" href="/movimientos" />
      <ul className="flex flex-1 flex-col gap-2">
        {cobros.map((f) => (
          <li
            key={f.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-surface-muted/70 px-3 py-2.5"
          >
            <span className="truncate text-sm text-muted">{f.cliente}</span>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold tabular-nums text-ink">
                {formatMonto(f.monto)}
              </p>
              <p className="text-[10px] text-faint">vence {f.vence}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
