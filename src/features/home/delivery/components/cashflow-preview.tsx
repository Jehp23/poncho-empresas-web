import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { SectionHeader } from "@/shared/ui/section-header";
import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardFooter,
} from "@/shared/ui/dashboard-card";
import { CashflowChart } from "@/features/cashflow/delivery/components/cashflow-chart";

export function CashflowPreview() {
  return (
    <DashboardCard>
      <SectionHeader title="CashFlow (12 meses)" href="/cashflow" linkLabel="Ver proyección" />
      <DashboardCardBody className="gap-3">
        <CashflowChart />
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
