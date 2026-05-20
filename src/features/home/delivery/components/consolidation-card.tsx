import Link from "next/link";
import { Brain, Upload } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { SectionHeader } from "@/shared/ui/section-header";
import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardFooter,
} from "@/shared/ui/dashboard-card";

export function ConsolidationCard() {
  return (
    <DashboardCard>
      <div className="mb-4 flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <SectionHeader title="Consolidación bancaria" className="mb-0" />
          <Badge variant="ai">IA</Badge>
        </div>
        <Link
          href="/consolidacion"
          className="shrink-0 whitespace-nowrap text-xs font-medium text-primary hover:text-primary-hover"
        >
          Abrir
        </Link>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted">
        Subí extractos PDF o CSV y la IA los interpreta automáticamente.
      </p>
      <DashboardCardBody>
        <div className="flex min-h-[7.5rem] flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle bg-surface-muted/50 px-4 py-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ai-soft text-ai">
            <Upload className="h-5 w-5" />
          </div>
          <p className="mt-3 text-sm font-medium text-ink">Arrastrá archivos acá</p>
          <p className="mt-1 text-xs text-faint">PDF, CSV · máx. 10 MB</p>
        </div>
      </DashboardCardBody>
      <div className="mt-4 flex min-w-0 items-center justify-between gap-2 rounded-lg bg-surface-muted px-3 py-2 text-xs">
        <span className="flex min-w-0 items-center gap-1.5 truncate text-muted">
          <Brain className="h-3.5 w-3.5 shrink-0 text-ai" />
          Última importación · Galicia Mayo
        </span>
        <Badge variant="success-vivid" className="shrink-0">
          Conciliado
        </Badge>
      </div>
      <DashboardCardFooter>
        <Link href="/consolidacion">
          <Button variant="secondary" className="w-full">
            Importar extracto
          </Button>
        </Link>
      </DashboardCardFooter>
    </DashboardCard>
  );
}
