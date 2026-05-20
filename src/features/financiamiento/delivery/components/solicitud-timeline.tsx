"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import type { WizardDraft } from "@/features/financiamiento/domain/wizard-schema";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { formatMonto } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

const PASOS = [
  { id: 1, label: "Solicitud enviada", detalle: "Carpeta recibida por Poncho Capital" },
  { id: 2, label: "En revisión", detalle: "Análisis de riesgo y documentación" },
  { id: 3, label: "Evaluación SGR", detalle: "Garantías y scoring crediticio" },
  { id: 4, label: "Resolución", detalle: "Aprobación y acreditación de línea" },
] as const;

export function SolicitudTimeline({ draft }: { draft: WizardDraft }) {
  const pasoActual = 2;

  return (
    <div className="space-y-6">
      <Card padding="md" className="border-l-4 border-l-primary">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="warning" className="mb-2">
              En revisión
            </Badge>
            <h3 className="font-display text-lg font-semibold text-ink">
              Carpeta financiera enviada
            </h3>
            <p className="mt-1 text-sm text-muted">
              Un asesor revisará tu solicitud en 48–72 hs hábiles.
            </p>
          </div>
          {draft.paso9?.montoSolicitado && (
            <div className="text-right">
              <p className="text-xs text-muted">Monto solicitado</p>
              <p className="font-display text-xl font-bold text-ink">
                {formatMonto(Number(draft.paso9.montoSolicitado.replace(/\D/g, "")) || 5_000_000)}
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card padding="lg">
        <p className="text-section-title mb-5">Estado de la solicitud</p>
        <ol className="space-y-0">
          {PASOS.map((paso, i) => {
            const completado = paso.id < pasoActual;
            const actual = paso.id === pasoActual;
            const pendiente = paso.id > pasoActual;

            return (
              <li key={paso.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      completado && "bg-success-vivid-soft text-success-vivid",
                      actual && "bg-primary-soft text-primary ring-2 ring-primary/30",
                      pendiente && "bg-surface-muted text-faint",
                    )}
                  >
                    {completado ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : actual ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <Circle className="h-3 w-3" />
                    )}
                  </div>
                  {i < PASOS.length - 1 && (
                    <div
                      className={cn(
                        "my-1 w-0.5 flex-1 min-h-[32px]",
                        completado ? "bg-success-vivid/40" : "bg-border-subtle",
                      )}
                    />
                  )}
                </div>
                <div className={cn("pb-6", i === PASOS.length - 1 && "pb-0")}>
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      actual ? "text-primary" : completado ? "text-ink" : "text-muted",
                    )}
                  >
                    {paso.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{paso.detalle}</p>
                  {actual && (
                    <p className="mt-2 text-xs font-medium text-primary">
                      En curso — te avisaremos por email
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Card>

      <Card padding="md" className="bg-surface-muted/40">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">Demo:</span> completá el wizard y
          enviá la solicitud para ver este timeline en la pestaña Carpeta Financiera.
        </p>
      </Card>
    </div>
  );
}
