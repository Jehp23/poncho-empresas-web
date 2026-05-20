"use client";

import { Clock } from "lucide-react";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";

type ComingSoonViewProps = {
  titulo: string;
  descripcion: string;
  items?: string[];
};

export function ComingSoonView({ titulo, descripcion, items }: ComingSoonViewProps) {
  return (
    <PageShell ancho="estrecho">
      <PageHeaderRow titulo={titulo} subtitulo={descripcion} />

      <Card padding="lg">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-muted">
            <Clock className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <Badge variant="default" className="mb-3">
              Próximamente
            </Badge>
            <h2 className="font-display text-lg font-semibold text-ink">
              Estamos trabajando en esto
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{descripcion}</p>
            {items && items.length > 0 && (
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
