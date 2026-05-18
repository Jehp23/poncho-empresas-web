import Link from "next/link";
import { AlertCircle, ArrowDownLeft, FileText } from "lucide-react";
import type {
  FacturaPorCobrar,
  ResumenEcheqs,
  Vencimiento,
} from "@/shared/types/app";
import { Card } from "@/shared/ui/card";
import { IconBox } from "@/shared/ui/icon-box";
import { formatMonto } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

type TodayRowProps = {
  pagos: Vencimiento[];
  cobros: FacturaPorCobrar[];
  echeqs: ResumenEcheqs;
};

function ColumnHeader({
  icon: Icon,
  title,
  href,
  tone,
}: {
  icon: typeof AlertCircle;
  title: string;
  href: string;
  tone: "danger" | "success" | "primary";
}) {
  const toneClass = {
    danger: "text-danger",
    success: "text-success",
    primary: "text-primary",
  }[tone];

  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <IconBox icon={Icon} size="sm" tone={tone} />
        <h2 className="text-section-title">{title}</h2>
      </div>
      <Link
        href={href}
        className={cn("text-xs font-semibold hover:underline", toneClass)}
      >
        Ver todo
      </Link>
    </div>
  );
}

export function TodayRow({ pagos, cobros, echeqs }: TodayRowProps) {
  const pagosUrgentes = pagos.filter((p) => p.urgente).slice(0, 2);
  const cobrosTop = cobros.slice(0, 2);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card padding="lg" tone="danger" className="flex h-full flex-col">
        <div className="gradient-accent-bar mb-4 h-1 w-12 rounded-full" />
        <ColumnHeader
          icon={AlertCircle}
          title="Pagos urgentes"
          href="/operar?tab=movimientos"
          tone="danger"
        />
        <ul className="flex flex-1 flex-col gap-2">
          {pagosUrgentes.length === 0 ? (
            <li className="text-sm text-faint">Sin pagos urgentes hoy</li>
          ) : (
            pagosUrgentes.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-danger/10 bg-danger-soft/80 px-3 py-2.5"
              >
                <span className="truncate text-sm font-medium text-ink">{p.descripcion}</span>
                <span className="shrink-0 rounded-full bg-danger/10 px-2 py-0.5 text-xs font-bold text-danger">
                  {p.fecha}
                </span>
              </li>
            ))
          )}
        </ul>
      </Card>

      <Card padding="lg" tone="success" className="flex h-full flex-col">
        <div className="mb-4 h-1 w-12 rounded-full bg-success" />
        <ColumnHeader
          icon={ArrowDownLeft}
          title="Cobros"
          href="/operar?tab=movimientos"
          tone="success"
        />
        <ul className="flex flex-1 flex-col gap-2">
          {cobrosTop.map((f) => (
            <li
              key={f.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-success/10 bg-success-soft/70 px-3 py-2.5"
            >
              <span className="truncate text-sm font-medium text-ink">{f.cliente}</span>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold tabular-nums text-success">
                  {formatMonto(f.monto)}
                </p>
                <p className="text-[10px] text-faint">vence {f.vence}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card padding="lg" tone="primary" className="flex h-full flex-col">
        <div className="mb-4 h-1 w-12 rounded-full bg-primary" />
        <ColumnHeader icon={FileText} title="eCheqs" href="/echeqs" tone="primary" />
        <div className="flex flex-1 flex-col justify-center gap-3">
          <Link
            href="/echeqs?tab=emitidos"
            className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface/80 px-3 py-2.5 transition-colors hover:border-primary/20 hover:bg-primary-soft/40"
          >
            <span className="text-sm text-muted">Emitidos pendientes</span>
            <span className="font-bold tabular-nums text-ink">
              {echeqs.emitidosPendientes}
            </span>
          </Link>
          <Link
            href="/echeqs?tab=recibidos"
            className="flex items-center justify-between rounded-xl border border-accent/25 bg-accent-soft px-3 py-2.5 transition-colors hover:bg-accent-soft/80"
          >
            <span className="text-sm font-semibold text-amber-900">Por cobrar</span>
            <span className="font-bold tabular-nums text-amber-900">
              {formatMonto(echeqs.recibidosMonto)}
            </span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
