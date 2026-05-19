import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { SectionHeader } from "@/shared/ui/section-header";
import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardFooter,
} from "@/shared/ui/dashboard-card";

export function MoneyMarketCard() {
  return (
    <DashboardCard>
      <SectionHeader
        title="Cuenta remunerada"
        href="/cuenta-remunerada"
        linkLabel="Ver FCI"
      />
      <DashboardCardBody className="gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-amber-800">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">FCI Money Market</p>
            <p className="truncate text-xs text-faint">Inversión automática</p>
          </div>
        </div>
        <div className="rounded-xl bg-surface-muted px-3 py-3">
          <p className="text-label">TNA estimada</p>
          <p className="font-display text-2xl font-semibold text-primary">38,5%</p>
          <Badge variant="accent" className="mt-2 max-w-full truncate">
            +$4.120 acumulado
          </Badge>
        </div>
      </DashboardCardBody>
      <DashboardCardFooter>
        <Link
          href="/cuenta-remunerada"
          className="block truncate text-xs font-medium text-primary hover:underline"
        >
          Configurar reglas de inversión →
        </Link>
      </DashboardCardFooter>
    </DashboardCard>
  );
}
