import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { FinanciamientoResumen } from "@/shared/types/app";
import { Card } from "@/shared/ui/card";

const estadoLabel: Record<FinanciamientoResumen["estado"], string> = {
  no_iniciado: "No iniciado",
  en_progreso: "En progreso",
  en_revision: "En revisión",
  aprobado: "Aprobado",
  requiere_accion: "Requiere acción",
};

export function FinancingStrip({ data }: { data: FinanciamientoResumen }) {
  return (
    <Link href="/financiamiento" className="block">
      <Card
        padding="md"
        className="transition-shadow hover:shadow-card-hover"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-lg font-bold text-amber-900">
            {data.score ?? "—"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">Financiamiento</p>
            <p className="truncate text-xs text-muted">
              {estadoLabel[data.estado]}
              {data.pasoActual != null &&
                ` · Paso ${data.pasoActual}/${data.pasosTotal}`}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-faint" />
        </div>
      </Card>
    </Link>
  );
}
