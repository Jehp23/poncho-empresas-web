"use client";

import { Upload } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { SectionHeader } from "@/shared/ui/section-header";

const IMPORTACIONES_RECIENTES = [
  {
    id: "pw",
    wallet: true,
    nombre: "Poncho Wallet · Mayo 2026",
    detalle: "FCI + comitente · Tiempo real",
    badge: { label: "Nativo", variant: "wallet" as const },
  },
  {
    id: "galicia",
    wallet: false,
    nombre: "Galicia_Mayo2026.pdf",
    detalle: "247 mov · hace 2 días",
    badge: { label: "Conciliado", variant: "success-vivid" as const },
  },
  {
    id: "macro",
    wallet: false,
    nombre: "Macro_Mayo2026.csv",
    detalle: "189 mov · hace 5 días",
    badge: { label: "Conciliado", variant: "success-vivid" as const },
  },
  {
    id: "nacion",
    wallet: false,
    nombre: "Nacion_Abr2026.pdf",
    detalle: "103 mov · hace 12 días",
    badge: { label: "En revisión", variant: "warning" as const },
  },
];

const INSIGHTS_IA = [
  {
    id: "tendencia",
    titulo: "Tendencia positiva",
    texto: "Los ingresos crecen 12% respecto al mes anterior.",
    variant: "success-vivid" as const,
  },
  {
    id: "atencion",
    titulo: "Atención",
    texto: "Galicia tiene 3 débitos automáticos sin categorizar.",
    variant: "warning" as const,
  },
  {
    id: "sugerencia",
    titulo: "Sugerencia",
    texto: "Considerá centralizar pagos a proveedores en Macro para optimizar comisiones.",
    variant: "info" as const,
  },
];

export function ExtractoPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card padding="md">
        <SectionHeader title="Importar extracto" className="mb-3" />
        <Badge variant="ai" className="mb-3">
          Asistido por IA
        </Badge>

        <div className="mb-4 rounded-lg border-2 border-dashed border-border-strong bg-bg px-4 py-5 text-center transition-colors hover:border-primary hover:bg-primary-soft/30">
          <Upload className="mx-auto h-6 w-6 text-muted" />
          <p className="mt-2 text-sm font-semibold text-ink">Arrastrá tu extracto bancario</p>
          <p className="mt-0.5 text-xs text-muted">PDF o CSV · Cualquier banco</p>
          <Button className="mt-3 h-8 px-4 text-xs">Subir archivo</Button>
        </div>

        <p className="text-label mb-2">Importaciones recientes</p>
        <ul className="flex flex-col gap-2">
          {IMPORTACIONES_RECIENTES.map((item) => (
            <li
              key={item.id}
              className={
                item.wallet
                  ? "flex items-center gap-2 rounded-lg border border-wallet/20 bg-wallet-soft/40 p-2"
                  : "flex items-center gap-2 rounded-lg bg-surface-muted/60 p-2"
              }
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-ink">{item.nombre}</p>
                <p className="text-[10px] text-muted">{item.detalle}</p>
              </div>
              <Badge variant={item.badge.variant} className="shrink-0 text-[10px]">
                {item.badge.label}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      <Card padding="md" className="gradient-ai border-primary/15">
        <p className="text-label mb-3 text-primary">Análisis IA</p>
        <ul className="flex flex-col gap-2">
          {INSIGHTS_IA.map((insight) => (
            <li
              key={insight.id}
              className="rounded-lg border border-border-subtle bg-surface px-3 py-2.5"
            >
              <Badge variant={insight.variant} className="mb-1.5">
                {insight.titulo}
              </Badge>
              <p className="text-xs leading-relaxed text-muted">{insight.texto}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
