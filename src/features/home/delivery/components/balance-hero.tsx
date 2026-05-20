"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDownToLine, ArrowLeftRight, TrendingUp } from "lucide-react";
import { FilterChips } from "@/shared/ui/filter-chips";
import { Button } from "@/shared/ui/button";
import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardFooter,
} from "@/shared/ui/dashboard-card";
import { formatMonto, formatPorcentaje } from "@/shared/lib/format";

const PERIODOS = [
  { id: "30d", label: "30d" },
  { id: "90d", label: "90d" },
  { id: "12m", label: "12m" },
] as const;

type PeriodoId = (typeof PERIODOS)[number]["id"];

function BalanceSparkline() {
  return (
    <svg
      className="h-16 w-full"
      viewBox="0 0 480 60"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="balance-fill-home" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f5c47" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1f5c47" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,55 L16,50 L32,48 L48,44 L64,46 L80,42 L96,38 L112,40 L128,35 L144,32 L160,30 L176,28 L192,25 L208,22 L224,20 L240,18 L256,16 L272,14 L288,12 L304,14 L320,10 L336,8 L352,6 L368,5 L384,4 L400,6 L416,5 L432,3 L448,2 L464,1 L480,0 L480,60 L0,60Z"
        fill="url(#balance-fill-home)"
      />
      <path
        d="M0,55 L16,50 L32,48 L48,44 L64,46 L80,42 L96,38 L112,40 L128,35 L144,32 L160,30 L176,28 L192,25 L208,22 L224,20 L240,18 L256,16 L272,14 L288,12 L304,14 L320,10 L336,8 L352,6 L368,5 L384,4 L400,6 L416,5 L432,3 L448,2 L464,1 L480,0"
        fill="none"
        stroke="#1f5c47"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BalanceHero({
  saldoTotal,
  variacionMes,
}: {
  saldoTotal: number;
  variacionMes: number;
}) {
  const [periodo, setPeriodo] = useState<PeriodoId>("30d");
  const positivo = variacionMes >= 0;

  return (
    <DashboardCard className="h-full">
      <DashboardCardBody className="gap-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-label">Saldo total consolidado</p>
            <p className="font-display mt-2 break-words text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-ink">
              {formatMonto(saldoTotal)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  positivo
                    ? "border border-success-vivid/30 bg-success-vivid-soft text-success-vivid"
                    : "border border-danger/20 bg-danger-soft text-danger"
                }`}
              >
                <TrendingUp
                  className={`h-3 w-3 ${!positivo && "rotate-180"}`}
                  aria-hidden
                />
                {positivo ? "▲" : "▼"} {formatPorcentaje(Math.abs(variacionMes))}
              </span>
              <span className="text-sm text-muted">vs. mes anterior</span>
            </div>
          </div>
          <FilterChips
            items={PERIODOS}
            active={periodo}
            onChange={setPeriodo}
            className="shrink-0"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/operar?tab=transferir">
            <Button>
              <ArrowLeftRight className="h-4 w-4" />
              Transferir
            </Button>
          </Link>
          <Link href="/operar?tab=depositar">
            <Button variant="secondary">
              <ArrowDownToLine className="h-4 w-4" />
              Depositar
            </Button>
          </Link>
        </div>
      </DashboardCardBody>
      <DashboardCardFooter className="pt-0">
        <div className="overflow-hidden rounded-lg bg-surface-muted/30 px-1 pt-2">
          <BalanceSparkline />
          <div className="mt-1 flex justify-between px-1 text-[10px] text-faint">
            <span>01 Abr</span>
            <span>01 May</span>
            <span>Hoy</span>
          </div>
        </div>
      </DashboardCardFooter>
    </DashboardCard>
  );
}
