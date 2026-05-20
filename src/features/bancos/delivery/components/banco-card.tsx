"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { formatMonto } from "@/shared/lib/format";
import type { BancoConectado, EstadoBanco } from "../../domain/types";

interface Props {
  banco: BancoConectado;
}

const estadoDot: Record<EstadoBanco, string> = {
  sincronizado: "bg-[#4ade80]",
  actualizando: "bg-accent animate-pulse",
  error: "bg-danger",
  desconectado: "bg-faint",
};

function BancoExternoCard({ banco }: Props) {
  const dot = estadoDot[banco.estado];

  return (
    <div
      className="rounded-card border border-border-subtle bg-surface p-4 shadow-card transition-shadow hover:shadow-hover"
      style={{ borderTop: `3px solid ${banco.color}` }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold text-ink">{banco.nombre}</p>
          <p className="mt-0.5 truncate text-[11px] text-muted">{banco.subtitulo}</p>
        </div>
        <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", dot)} title={banco.estado} />
      </div>

      <p className="font-display text-2xl font-bold tracking-tight text-ink">
        {formatMonto(banco.saldo)}
      </p>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
        <span>{banco.porcentajeTotal}% del total</span>
        <span>Últ. mov. {banco.ultimoMovimiento}</span>
      </div>
    </div>
  );
}

function WalletCard({ banco }: Props) {
  return (
    <div
      className="rounded-card border border-border-subtle bg-surface p-4 shadow-card transition-shadow hover:shadow-hover"
      style={{ borderTop: `3px solid ${banco.color}` }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold text-ink">{banco.nombre}</p>
          <p className="mt-0.5 truncate text-[11px] text-muted">{banco.subtitulo}</p>
        </div>
        <span className="shrink-0 rounded-full bg-wallet-soft px-2 py-0.5 text-[10px] font-bold text-wallet">
          Poncho
        </span>
      </div>

      <p className="font-display text-2xl font-bold tracking-tight text-ink">
        {formatMonto(banco.saldo)}
      </p>

      <div className="mt-3 space-y-1 text-[11px] text-muted">
        <div className="flex justify-between">
          <span>Disponible</span>
          <span className="font-semibold text-ink">{formatMonto(banco.saldoDisponible ?? 0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Remunerada</span>
          <span className="font-semibold text-ink">{formatMonto(banco.saldoRemunerado ?? 0)}</span>
        </div>
      </div>

      <Link
        href="/cuenta-remunerada"
        className="mt-3 flex items-center justify-between rounded-lg bg-bg px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft/40"
      >
        Ver cuenta remunerada
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export function BancoCard({ banco }: Props) {
  if (banco.tipo === "poncho_wallet") return <WalletCard banco={banco} />;
  return <BancoExternoCard banco={banco} />;
}
