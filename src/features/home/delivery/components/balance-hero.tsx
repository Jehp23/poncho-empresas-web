import Link from "next/link";
import { ArrowDownToLine, ArrowLeftRight, TrendingUp } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardFooter,
} from "@/shared/ui/dashboard-card";
import { formatMonto, formatPorcentaje } from "@/shared/lib/format";

function BalanceSparkline() {
  return (
    <svg
      className="h-14 w-full"
      viewBox="0 0 400 56"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f5c47" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1f5c47" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 42 Q 50 32 100 36 T 200 24 T 300 30 T 400 14 L 400 56 L 0 56 Z"
        fill="url(#balance-fill)"
      />
      <path
        d="M0 42 Q 50 32 100 36 T 200 24 T 300 30 T 400 14"
        fill="none"
        stroke="#1f5c47"
        strokeWidth="1.5"
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
  const positivo = variacionMes >= 0;

  return (
    <DashboardCard>
      <DashboardCardBody className="gap-6">
        <div className="min-w-0">
          <p className="text-label">Saldo total consolidado</p>
          <p className="font-display mt-2 break-words text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-tight tracking-tight text-ink">
            {formatMonto(saldoTotal)}
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <span
              className={`inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
                positivo ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
              }`}
            >
              <TrendingUp
                className={`h-3 w-3 ${!positivo && "rotate-180"}`}
                aria-hidden
              />
              {formatPorcentaje(variacionMes)}
            </span>
            <span className="text-sm text-muted">vs. mes anterior · 30 días</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/transferencias">
            <Button>
              <ArrowLeftRight className="h-4 w-4" />
              Transferir
            </Button>
          </Link>
          <Link href="/depositos">
            <Button variant="secondary">
              <ArrowDownToLine className="h-4 w-4" />
              Depositar
            </Button>
          </Link>
        </div>
      </DashboardCardBody>
      <DashboardCardFooter className="pt-0">
        <div className="overflow-hidden rounded-lg bg-surface-muted/40">
          <BalanceSparkline />
        </div>
      </DashboardCardFooter>
    </DashboardCard>
  );
}
