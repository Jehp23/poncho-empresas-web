import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { SectionHeader } from "@/shared/ui/section-header";
import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardFooter,
} from "@/shared/ui/dashboard-card";

const MESES = ["Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May"];
const INGRESOS = [820, 910, 880, 950, 1020, 980, 1100, 1050, 990, 1080, 1120, 1150];
const EGRESOS = [720, 780, 810, 790, 850, 820, 880, 860, 840, 900, 870, 890];

export function CashflowPreview() {
  const max = Math.max(...INGRESOS, ...EGRESOS);

  return (
    <DashboardCard>
      <SectionHeader title="CashFlow (12 meses)" href="/cashflow" linkLabel="Ver proyección" />
      <DashboardCardBody className="gap-3">
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <div className="flex h-32 min-w-[520px] items-end gap-1" aria-hidden>
            {MESES.map((mes, i) => (
              <div key={mes} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                <div className="flex h-24 w-full items-end justify-center gap-0.5">
                  <div
                    className="w-[42%] max-w-3 rounded-t-sm bg-primary/70"
                    style={{ height: `${(INGRESOS[i] / max) * 100}%`, minHeight: 4 }}
                  />
                  <div
                    className="w-[42%] max-w-3 rounded-t-sm bg-muted/30"
                    style={{ height: `${(EGRESOS[i] / max) * 100}%`, minHeight: 4 }}
                  />
                </div>
                <span className="w-full truncate text-center text-[10px] text-faint">
                  {mes}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-primary/70" /> Ingresos
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-muted/30" /> Egresos
          </span>
        </div>
      </DashboardCardBody>
      <DashboardCardFooter>
        <Link href="/cashflow">
          <Button variant="secondary" className="w-full sm:w-auto">
            Ver proyección completa
          </Button>
        </Link>
      </DashboardCardFooter>
    </DashboardCard>
  );
}
