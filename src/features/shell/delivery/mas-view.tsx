"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { SECONDARY_MODULES } from "@/features/shell/config/navigation";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";

export function MasView() {
  const data = useDashboardData();

  return (
    <PageShell
      usuario={data.usuario}
      titulo="Más"
      subtitulo="Módulos adicionales y configuración."
      ancho="completo"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {SECONDARY_MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link key={mod.href} href={mod.href}>
              <Card
                padding="lg"
                className={cn(
                  "group flex items-center gap-4 transition-shadow hover:shadow-hover",
                  mod.pronto && "opacity-90",
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted text-muted group-hover:bg-primary-soft group-hover:text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{mod.label}</p>
                  {mod.pronto && (
                    <p className="text-xs text-faint">Próximamente</p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-faint" />
              </Card>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
