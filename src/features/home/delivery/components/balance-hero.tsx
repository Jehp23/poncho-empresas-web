import Link from "next/link";
import { ArrowDownToLine, ArrowLeftRight, TrendingUp } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { formatMonto, formatPorcentaje } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

function BalanceSparkline() {
  return (
    <svg
      className="h-20 w-full"
      viewBox="0 0 400 64"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4a300" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f4a300" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="balance-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7dd4a8" />
          <stop offset="60%" stopColor="#f4a300" />
          <stop offset="100%" stopColor="#ffc94d" />
        </linearGradient>
      </defs>
      <path
        d="M0 48 Q 50 38 100 42 T 200 28 T 300 34 T 400 16 L 400 64 L 0 64 Z"
        fill="url(#balance-fill)"
      />
      <path
        d="M0 48 Q 50 38 100 42 T 200 28 T 300 34 T 400 16"
        fill="none"
        stroke="url(#balance-line)"
        strokeWidth="2"
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
    <Card
      padding="lg"
      className={cn(
        "relative flex h-full flex-col overflow-hidden border-0 text-white",
        "gradient-hero shadow-[var(--pe-shadow-hero)]",
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-6 left-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col justify-between gap-6">
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-white/70">
            Saldo total consolidado
          </p>
          <p className="font-poncho mt-2 text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.25rem]">
            {formatMonto(saldoTotal)}
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                positivo
                  ? "bg-white/15 text-emerald-100 ring-1 ring-white/20"
                  : "bg-red-400/20 text-red-100 ring-1 ring-red-300/30",
              )}
            >
              <TrendingUp
                className={cn("h-3 w-3", !positivo && "rotate-180")}
                aria-hidden
              />
              {formatPorcentaje(variacionMes)}
            </span>
            <span className="text-white/65">vs. mes anterior</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/operar?tab=transferir">
            <Button variant="accent">
              <ArrowLeftRight className="h-4 w-4" />
              Transferir
            </Button>
          </Link>
          <Link href="/operar?tab=depositar">
            <Button
              variant="secondary"
              className="border-white/25 bg-white/10 text-white hover:bg-white/20"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Depositar
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative mt-4 -mx-2 opacity-90">
        <BalanceSparkline />
      </div>
    </Card>
  );
}
