import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { MensajeAsesor, SaludFinanciera } from "@/shared/types/app";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";

const saludVariant = {
  excelente: "accent" as const,
  estable: "primary" as const,
  atencion: "warning" as const,
};

const saludTone: Record<SaludFinanciera, string> = {
  excelente: "card-tone-accent border-l-accent",
  estable: "card-tone-primary border-l-primary",
  atencion: "card-tone-danger border-l-warning",
};

const iconTone: Record<SaludFinanciera, string> = {
  excelente: "bg-accent-soft text-amber-800 ring-accent/30",
  estable: "bg-primary-soft text-primary ring-primary/20",
  atencion: "bg-warning-soft text-warning ring-warning/25",
};

export function AdvisorNote({
  asesor,
  accionHref = "/financiamiento",
  accionLabel = "Revisar pre-calificación",
}: {
  asesor: MensajeAsesor;
  accionHref?: string;
  accionLabel?: string;
}) {
  return (
    <Card
      padding="md"
      className={cn("border-l-4 shadow-card", saludTone[asesor.salud])}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1",
            iconTone[asesor.salud],
          )}
        >
          <Sparkles className="h-[18px] w-[18px]" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Badge variant={saludVariant[asesor.salud]}>{asesor.titulo}</Badge>
            <span className="text-xs text-faint">{asesor.actualizadoEn}</span>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-ink">{asesor.mensaje}</p>
          <p className="mt-2 text-xs font-medium text-primary/80">{asesor.asesor}</p>
        </div>
        <Link href={accionHref} className="shrink-0">
          <Button variant="primary" className="w-full sm:w-auto">
            {accionLabel}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
