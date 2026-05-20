"use client";

import { AdvisorNote } from "@/features/home/delivery/components/advisor-note";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import {
  MOCK_CONSOLIDACION,
  MOCK_INSIGHT_BANCOS,
  MOCK_MOVIMIENTOS_BANCO,
} from "../domain/mock";
import { ConsolidadoHero } from "./components/consolidado-hero";
import { BancoCard } from "./components/banco-card";
import { MovimientosConsolidados } from "./components/movimientos-consolidados";
import { PendientesConciliar } from "./components/pendientes-conciliar";
import { PageHeaderRow } from "@/shared/ui/page-header-row";
import { SectionHeader } from "@/shared/ui/section-header";

export function BancosView() {
  const data = MOCK_CONSOLIDACION;

  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="Bancos"
        subtitulo="Todos tus bancos y Poncho Wallet en un solo lugar."
      />

      <ConsolidadoHero data={data} />

      <div className="mb-6">
        <AdvisorNote
          asesor={MOCK_INSIGHT_BANCOS}
          accionHref="#movimientos-bancos"
          accionLabel="Revisar movimientos"
        />
      </div>

      <PendientesConciliar />

      <SectionHeader title="Cuentas conectadas" className="mb-4" />
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.bancos.map((banco) => (
          <BancoCard key={banco.id} banco={banco} />
        ))}
      </div>

      <div id="movimientos-bancos">
        <MovimientosConsolidados movimientos={MOCK_MOVIMIENTOS_BANCO} />
      </div>
    </PageShell>
  );
}
