"use client";

import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { ActivityPreview } from "./components/activity-preview";
import { AdvisorNote } from "./components/advisor-note";
import { BalanceHero } from "./components/balance-hero";
import { FinancingCard } from "./components/financing-card";
import { TodayRow } from "./components/today-row";

function mostrarFinanciamiento(data: ReturnType<typeof useDashboardData>) {
  const f = data.financiamiento;
  if (f.estado === "no_iniciado" || f.estado === "en_progreso") return true;
  if (f.pasoActual != null && f.pasoActual < f.pasosTotal) return true;
  return false;
}

export function HomeView() {
  const data = useDashboardData();
  const showFinancing = mostrarFinanciamiento(data);

  return (
    <PageShell usuario={data.usuario} ancho="completo">
      <div className="space-y-6">
        <AdvisorNote
          asesor={data.asesor}
          accionHref={
            showFinancing ? "/financiamiento/solicitud/1" : "/operar?tab=movimientos"
          }
          accionLabel={
            showFinancing ? "Continuar financiamiento" : "Ver movimientos"
          }
        />

        <BalanceHero
          saldoTotal={data.saldoTotal}
          variacionMes={data.variacionMes}
        />

        <TodayRow
          pagos={data.proximosPagos}
          cobros={data.facturasPorCobrar}
          echeqs={data.echeqs}
        />

        {showFinancing ? (
          <FinancingCard data={data.financiamiento} />
        ) : (
          <ActivityPreview items={data.actividad} limit={3} />
        )}
      </div>
    </PageShell>
  );
}
