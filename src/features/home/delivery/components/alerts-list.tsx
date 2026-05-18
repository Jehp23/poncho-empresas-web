import Link from "next/link";
import type { FacturaPorCobrar, Vencimiento } from "@/shared/types/app";
import { Card } from "@/shared/ui/card";

export function AlertsList({
  pagos,
  cobros,
}: {
  pagos: Vencimiento[];
  cobros: FacturaPorCobrar[];
}) {
  return (
    <Card padding="md">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">Próximos vencimientos</h2>
        <Link href="/movimientos" className="text-xs font-medium text-primary">
          Ver todo
        </Link>
      </div>
      <ul className="space-y-2.5">
        {pagos.slice(0, 2).map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-2 text-sm">
            <span className="truncate text-muted">{p.descripcion}</span>
            <span className={cnDate(p.urgente)}>{p.fecha}</span>
          </li>
        ))}
        {cobros.slice(0, 1).map((f) => (
          <li key={f.id} className="flex items-center justify-between gap-2 text-sm">
            <span className="truncate text-muted">Cobro: {f.cliente}</span>
            <span className="shrink-0 font-medium text-ink">{f.vence}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function cnDate(urgente?: boolean) {
  return `shrink-0 text-xs font-semibold ${urgente ? "text-danger" : "text-muted"}`;
}
