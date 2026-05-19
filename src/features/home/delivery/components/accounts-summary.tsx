import { Building2, PiggyBank, Users, Wallet } from "lucide-react";
import type { Cuenta } from "@/shared/types/app";
import { IconBox } from "@/shared/ui/icon-box";
import { SectionHeader } from "@/shared/ui/section-header";
import {
  DashboardCard,
  DashboardCardBody,
} from "@/shared/ui/dashboard-card";
import { formatMonto } from "@/shared/lib/format";

const iconMap = {
  operativa: Building2,
  remunerada: PiggyBank,
  pagos: Wallet,
  cobros: Users,
};

export function AccountsSummary({ cuentas }: { cuentas: Cuenta[] }) {
  return (
    <DashboardCard>
      <SectionHeader title="Cuentas" href="/movimientos" linkLabel="Ver todas" />
      <DashboardCardBody>
        <ul className="flex flex-col gap-0.5">
          {cuentas.map((cuenta) => {
            const Icon = iconMap[cuenta.tipo];
            return (
              <li
                key={cuenta.id}
                className="flex min-w-0 items-center gap-2.5 rounded-lg px-1 py-2 transition-colors hover:bg-surface-muted"
              >
                <IconBox icon={Icon} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{cuenta.nombre}</p>
                  <p className="truncate text-xs text-faint">{cuenta.detalle}</p>
                </div>
                <p className="max-w-[42%] shrink-0 truncate text-right text-xs font-semibold tabular-nums text-ink sm:text-sm">
                  {formatMonto(cuenta.saldo)}
                </p>
              </li>
            );
          })}
        </ul>
      </DashboardCardBody>
    </DashboardCard>
  );
}
