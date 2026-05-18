import Link from "next/link";
import { ChevronRight, Landmark } from "lucide-react";
import type { FinanciamientoResumen } from "@/shared/types/app";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { SectionHeader } from "@/shared/ui/section-header";

const estadoLabel: Record<FinanciamientoResumen["estado"], string> = {
  no_iniciado: "No iniciado",
  en_progreso: "En progreso",
  en_revision: "En revisión",
  aprobado: "Aprobado",
  requiere_accion: "Requiere acción",
};

export function FinancingCard({ data }: { data: FinanciamientoResumen }) {
  const paso = data.pasoActual ?? 1;
  const progress = Math.round((paso / data.pasosTotal) * 100);
  const dashOffset = 251.2 - (251.2 * (data.score ?? 0)) / 100;
  const wizardHref =
    data.estado === "no_iniciado"
      ? "/financiamiento/solicitud/1"
      : `/financiamiento/solicitud/${paso}`;

  return (
    <Card padding="lg" tone="accent" className="flex h-full flex-col">
      <div className="gradient-accent-bar mb-2 h-1 w-14 rounded-full" />
      <SectionHeader title="Financiamiento" href="/financiamiento" linkLabel="Ver más" />
      <div className="flex flex-1 flex-col justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="relative h-[4.5rem] w-[4.5rem] shrink-0">
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
              <span className="font-poncho text-xl font-bold text-ink">
                {data.score ?? "—"}
              </span>
            </div>
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <Badge variant="primary" className="mb-2">
              {estadoLabel[data.estado]}
            </Badge>
            <p className="text-sm leading-relaxed text-muted">{data.mensaje}</p>
            {data.pasoActual != null && (
              <div className="mt-3">
                <div className="mb-1.5 flex justify-between text-xs text-faint">
                  <span>
                    Carpeta · paso {data.pasoActual}/{data.pasosTotal}
                  </span>
                  <span>{progress}%</span>
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
        <Link href={wizardHref}>
          <Button variant="accent" className="w-full">
            <Landmark className="h-4 w-4" />
            Continuar solicitud
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
