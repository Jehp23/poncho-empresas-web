import Link from "next/link";
import { Plus } from "lucide-react";
import type { FinanciamientoResumen } from "@/shared/types/app";
import { Button } from "@/shared/ui/button";

type FinanciamientoHeroProps = {
  data: FinanciamientoResumen;
  wizardHref: string;
};

export function FinanciamientoHero({ data, wizardHref }: FinanciamientoHeroProps) {
  const progress =
    data.pasoActual != null
      ? Math.round((data.pasoActual / data.pasosTotal) * 100)
      : 0;
  const dashOffset = 201 - (201 * progress) / 100;

  return (
    <div className="gradient-primary relative mb-6 overflow-hidden rounded-xl px-8 py-7 text-white shadow-md">
      <div className="pointer-events-none absolute -right-8 -top-12 h-56 w-56 rounded-full bg-white/[0.04]" />
      <div className="pointer-events-none absolute bottom-[-70px] right-[100px] h-40 w-40 rounded-full bg-white/[0.03]" />

      <div className="relative z-10 flex flex-wrap items-center gap-6">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">
            Sociedad de Garantía Recíproca
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold tracking-tight">
            Pre-calificación crediticia
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
            Completá tu carpeta financiera para acceder a líneas de crédito vía SGR
            y mercado de capitales.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={wizardHref}>
              <Button
                variant="secondary"
                className="border-white/20 bg-white text-primary hover:bg-white/90"
              >
                <Plus className="h-4 w-4" />
                Solicitá tu línea de crédito
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="text-white/80 hover:bg-white/10 hover:text-white"
            >
              Ver documentación →
            </Button>
          </div>
        </div>

        {data.pasoActual != null && (
          <div className="hidden shrink-0 text-center sm:block">
            <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="8"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="8"
                strokeDasharray="201"
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
              <text
                x="40"
                y="36"
                textAnchor="middle"
                className="fill-white font-display text-sm font-bold"
              >
                {progress}%
              </text>
              <text
                x="40"
                y="50"
                textAnchor="middle"
                className="fill-white/70 text-[7px]"
              >
                completado
              </text>
            </svg>
            <p className="mt-1 text-[11px] text-white/70">
              {data.pasoActual}/{data.pasosTotal} pasos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
