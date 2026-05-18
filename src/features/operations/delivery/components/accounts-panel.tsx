import { Building2, PiggyBank, Users, Wallet } from "lucide-react";
import type { Cuenta } from "@/shared/types/app";
import { Card } from "@/shared/ui/card";
import { IconBox } from "@/shared/ui/icon-box";
import { SectionHeader } from "@/shared/ui/section-header";
import { formatMonto } from "@/shared/lib/format";

const iconMap = {
  operativa: Building2,
  remunerada: PiggyBank,
  pagos: Wallet,
  cobros: Users,
};

export function AccountsPanel({ cuentas }: { cuentas: Cuenta[] }) {
  return (
    <Card padding="lg" className="flex h-full flex-col">
      <SectionHeader title="Cuentas" linkLabel="Consolidado" />
      <ul className="flex flex-1 flex-col gap-2">
        {cuentas.map((cuenta) => {
          const Icon = iconMap[cuenta.tipo];
          return (
            <li
              key={cuenta.id}
              className="flex items-center gap-3 rounded-xl px-1 py-2 transition-colors hover:bg-surface-muted/80"
            >
              <IconBox icon={Icon} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{cuenta.nombre}</p>
                <p className="truncate text-xs text-faint">{cuenta.detalle}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums text-ink">
                {formatMonto(cuenta.saldo)}
              </p>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
