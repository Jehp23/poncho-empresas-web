import Link from "next/link";
import { ChevronRight, Landmark } from "lucide-react";
import type { FinanciamientoResumen } from "@/shared/types/app";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { SectionHeader } from "@/shared/ui/section-header";
import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardFooter,
} from "@/shared/ui/dashboard-card";

const estadoLabel: Record<FinanciamientoResumen["estado"], string> = {
  no_iniciado: "No iniciado",
  en_progreso: "En progreso",
  en_revision: "En revisión",
  aprobado: "Aprobado",
  requiere_accion: "Requiere acción",
};

export function FinancingCard({ data }: { data: FinanciamientoResumen }) {
  const paso = data.pasoActual ?? 1;
  const progress =
    data.pasoActual != null
      ? Math.round((data.pasoActual / data.pasosTotal) * 100)
      : 0;
  const dashOffset = 251.2 - (251.2 * (data.score ?? 0)) / 100;
  const wizardHref =
    data.estado === "no_iniciado"
      ? "/financiamiento/solicitud/1"
      : `/financiamiento/solicitud/${paso}`;

  return (
    <DashboardCard>
      <SectionHeader title="Financiamiento" href="/financiamiento" linkLabel="Ver más" />
      <DashboardCardBody className="justify-between gap-4">
        <div className="min-w-0">
          <p className="text-label">Pre-calificación crediticia</p>
          <div className="mt-3 flex items-start gap-3">
            <div className="relative h-16 w-16 shrink-0">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="var(--pe-surface-muted)"
                  strokeWidth="6"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="var(--pe-accent)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={data.score == null ? 251.2 : dashOffset}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-ink">
                  {data.score ?? "—"}
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <Badge variant="primary" className="mb-2">
                {estadoLabel[data.estado]}
              </Badge>
              <p className="text-sm leading-relaxed text-muted">
                {data.mensaje || "Solicitá tu línea de crédito hoy +"}
              </p>
              {data.pasoActual != null && (
                <div className="mt-3">
                  <div className="mb-1.5 flex justify-between gap-2 text-xs text-faint">
                    <span className="truncate">
                      Paso {data.pasoActual}/{data.pasosTotal}
                    </span>
                    <span className="shrink-0">{progress}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardCardBody>
      <DashboardCardFooter>
        <Link href={wizardHref} className="block">
          <Button variant="accent" className="w-full">
            <Landmark className="h-4 w-4" />
            Iniciar solicitud
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </DashboardCardFooter>
    </DashboardCard>
  );
}
