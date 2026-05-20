"use client";

import { Settings, TrendingUp } from "lucide-react";
import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { FCI_PRODUCTOS, MOVIMIENTOS_FCI } from "../domain/mock";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { KpiCard } from "@/shared/ui/kpi-card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";
import { formatMonto } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

export function CuentaRemuneradaView() {
  const data = useDashboardData();
  const cuenta = data.cuentas.find((c) => c.tipo === "remunerada");
  const saldo = cuenta?.saldo ?? 0;
  const rendimientoMes = Math.round(saldo * 0.0975 / 12);
  const acumuladoMes = 1_024_000;

  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="Cuenta remunerada"
        subtitulo="Inversiones de liquidez con rendimiento diario."
        accion={
          <Button variant="secondary">
            <Settings className="h-4 w-4" />
            Configurar reglas
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Saldo invertido"
          value={formatMonto(saldo)}
          change={cuenta?.detalle ?? "FCI Money Market"}
          changeColor="muted"
          accentColor="var(--pe-accent)"
        />
        <KpiCard
          label="TNA estimada"
          value="97,5%"
          change="Poncho Pesos · activo"
          changeColor="success"
          accentColor="var(--pe-success-vivid)"
        />
        <KpiCard
          label="Acumulado mes"
          value={formatMonto(acumuladoMes)}
          change="Mayo 2026"
          changeColor="success"
          accentColor="var(--pe-primary)"
        />
        <KpiCard
          label="Rendimiento estimado"
          value={formatMonto(rendimientoMes)}
          change="Proyección mensual"
          changeColor="muted"
          accentColor="var(--pe-wallet)"
        />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        {FCI_PRODUCTOS.map((producto) => (
          <Card
            key={producto.id}
            padding="md"
            className={cn(
              "transition-shadow hover:shadow-hover",
              producto.activo && "border-primary/20",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    producto.activo ? "bg-primary-soft text-primary" : "bg-accent-soft text-amber-800",
                  )}
                >
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-ink">{producto.nombre}</p>
                  <p className="mt-0.5 text-xs text-muted">{producto.detalle}</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-xl font-bold text-success">
                  {producto.tna}%
                </p>
                <p className="text-[10px] text-faint">TNA estimada</p>
                <Badge variant={producto.badgeVariant} className="mt-2">
                  {producto.badge}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="gradient-ai mb-6 rounded-xl border border-border-subtle px-5 py-4">
        <p className="text-sm text-primary">
          Tu saldo ocioso de{" "}
          <strong>{formatMonto(data.cuentas.find((c) => c.tipo === "operativa")?.saldo ?? 0)}</strong>{" "}
          podría rendir{" "}
          <strong>{formatMonto(Math.round((data.cuentas.find((c) => c.tipo === "operativa")?.saldo ?? 0) * 0.0975 / 12))}/mes</strong>{" "}
          invirtiéndolo automáticamente.
        </p>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-border-subtle px-5 py-4">
          <p className="text-section-title">Movimientos recientes</p>
        </div>
        <ul>
          {MOVIMIENTOS_FCI.map((mov, i) => (
            <li
              key={mov.id}
              className={cn(
                "flex items-center justify-between gap-4 px-5 py-4",
                i > 0 && "border-t border-border-subtle",
              )}
            >
              <div>
                <p className="text-sm font-medium text-ink">{mov.descripcion}</p>
                <p className="text-xs text-faint">{mov.fecha}</p>
              </div>
              <p className="font-display font-semibold text-success">
                +{formatMonto(mov.monto)}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </PageShell>
  );
}
