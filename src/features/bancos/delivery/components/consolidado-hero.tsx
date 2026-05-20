import type { ConsolidacionData } from "../../domain/types";
import { formatMonto } from "@/shared/lib/format";
import { HeroActions } from "./hero-actions";

interface Props {
  data: ConsolidacionData;
}

export function ConsolidadoHero({ data }: Props) {
  const { bancos } = data;

  return (
    <div
      className="relative mb-6 overflow-hidden rounded-xl px-6 py-6 text-white sm:px-8 sm:py-7"
      style={{
        background: "linear-gradient(135deg, #1a4f3e 0%, #1f5c47 60%, #2d7a5e 100%)",
        boxShadow: "0 6px 28px rgba(31,92,71,0.22)",
      }}
    >
      <div className="pointer-events-none absolute -right-8 -top-12 h-56 w-56 rounded-full bg-white/[0.04]" />

      <div className="relative z-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
          <span className="text-xs font-medium text-white/70">
            {bancos.length} cuentas conectadas · Actualizado {data.ultimaActualizacion}
          </span>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/55">
              Saldo consolidado
            </p>
            <p className="font-display text-[34px] font-bold leading-none tracking-tight sm:text-[38px]">
              {formatMonto(data.saldoTotal)}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.2)] px-2.5 py-0.5 text-[11px] font-bold text-[#4ade80]">
                ▲ +{data.variacionMes}%
              </span>
              <span className="text-xs text-white/50">vs. mes anterior</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:text-right">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">
                Ingresos
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-[#4ade80] sm:text-xl">
                +{formatMonto(data.ingresosMes)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">
                Egresos
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-[#f87171] sm:text-xl">
                −{formatMonto(data.egresosMes)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/45">
                Neto
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-[#fbbf24] sm:text-xl">
                +{formatMonto(data.resultadoNeto)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium text-white/45">Distribución</span>
          </div>
          <div className="flex h-1.5 overflow-hidden rounded-full bg-white/10">
            {bancos.map((banco) => (
              <div
                key={banco.id}
                className="transition-all duration-500"
                style={{ width: `${banco.porcentajeTotal}%`, background: banco.color }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {bancos.map((banco) => (
              <span key={banco.id} className="flex items-center gap-1.5 text-[11px] text-white/60">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: banco.color }} />
                {banco.nombre.replace("Banco ", "")} · {banco.porcentajeTotal}%
              </span>
            ))}
          </div>
        </div>

        <HeroActions />
      </div>
    </div>
  );
}
