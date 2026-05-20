"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { USER_MENU_ITEMS } from "@/features/shell/config/navigation";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";

export function MasView() {
  const secondary = USER_MENU_ITEMS.filter((i) => i.pronto);

  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="Más módulos"
        subtitulo="Funcionalidades en desarrollo."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {secondary.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link key={mod.href} href={mod.href}>
              <Card padding="lg" className="group flex items-center gap-4 transition-shadow hover:shadow-hover">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted text-muted transition-colors group-hover:bg-primary-soft group-hover:text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{mod.label}</p>
                  <Badge variant="default" className="mt-1.5">
                    Próximamente
                  </Badge>
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
