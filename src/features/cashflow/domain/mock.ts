export type CashflowMes = {
  mes: string;
  ingresos: number;
  egresos: number;
};

export const CASHFLOW_PROYECCION: CashflowMes[] = [
  { mes: "Jun", ingresos: 8_200_000, egresos: 5_800_000 },
  { mes: "Jul", ingresos: 9_400_000, egresos: 6_200_000 },
  { mes: "Ago", ingresos: 8_800_000, egresos: 6_000_000 },
  { mes: "Sep", ingresos: 10_500_000, egresos: 7_100_000 },
  { mes: "Oct", ingresos: 9_900_000, egresos: 6_600_000 },
  { mes: "Nov", ingresos: 11_200_000, egresos: 7_400_000 },
  { mes: "Dic", ingresos: 13_500_000, egresos: 9_000_000 },
  { mes: "Ene", ingresos: 10_500_000, egresos: 8_600_000 },
  { mes: "Feb", ingresos: 9_900_000, egresos: 8_400_000 },
  { mes: "Mar", ingresos: 10_800_000, egresos: 9_000_000 },
  { mes: "Abr", ingresos: 11_200_000, egresos: 8_700_000 },
  { mes: "May", ingresos: 11_500_000, egresos: 8_900_000 },
];

export function buildCashflowTable(data: CashflowMes[]) {
  let acumulado = 2_800_000;
  return data.map((row) => {
    const neto = row.ingresos - row.egresos;
    acumulado += neto;
    return { ...row, neto, acumulado };
  });
}

export const CASHFLOW_TABLE = buildCashflowTable(CASHFLOW_PROYECCION);

export function cashflowKpis(data: CashflowMes[]) {
  const ingresosTotal = data.reduce((s, r) => s + r.ingresos, 0);
  const egresosTotal = data.reduce((s, r) => s + r.egresos, 0);
  const netoTotal = ingresosTotal - egresosTotal;
  const promedioIngresos = Math.round(ingresosTotal / data.length);
  const promedioEgresos = Math.round(egresosTotal / data.length);
  const ultimo = buildCashflowTable(data).at(-1);
  return {
    promedioIngresos,
    promedioEgresos,
    netoPromedio: promedioIngresos - promedioEgresos,
    saldoAcumulado: ultimo?.acumulado ?? 0,
    netoTotal,
  };
}
