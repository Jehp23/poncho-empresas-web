import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { ResumenEcheqs } from "@/shared/types/app";
import { Card } from "@/shared/ui/card";
import { SectionHeader } from "@/shared/ui/section-header";
import { formatMonto } from "@/shared/lib/format";

export function EcheqsSummary({ echeqs }: { echeqs: ResumenEcheqs }) {
  return (
    <Card padding="lg" className="flex h-full flex-col">
      <SectionHeader title="eCheqs" href="/echeqs" linkLabel="Gestionar" />
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="flex flex-col justify-center rounded-xl bg-surface-muted p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Emitidos
          </div>
          <p className="font-poncho text-lg font-semibold tabular-nums text-ink">
            {formatMonto(echeqs.emitidosMonto)}
          </p>
          <p className="mt-1 text-xs text-faint">{echeqs.emitidosPendientes} pendientes</p>
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-primary/10 bg-primary-soft/50 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-primary">
            <ArrowDownLeft className="h-3.5 w-3.5" />
            Recibidos
          </div>
          <p className="font-poncho text-lg font-semibold tabular-nums text-ink">
            {formatMonto(echeqs.recibidosMonto)}
          </p>
          <p className="mt-1 text-xs font-medium text-success">
            {echeqs.recibidosPorCobrar} por cobrar
          </p>
        </div>
      </div>
    </Card>
  );
}
