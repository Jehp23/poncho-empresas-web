export type PendienteConciliacion = {
  id: string;
  banco: string;
  descripcion: string;
  monto: number;
  fecha: string;
};

export const MOCK_PENDIENTES_CONCILIAR: PendienteConciliacion[] = [
  {
    id: "pc1",
    banco: "Galicia",
    descripcion: "Débito automático — Seguro Río",
    monto: 245_000,
    fecha: "18 may",
  },
  {
    id: "pc2",
    banco: "Galicia",
    descripcion: "Comisión mantenimiento CC",
    monto: 12_500,
    fecha: "17 may",
  },
  {
    id: "pc3",
    banco: "Nación",
    descripcion: "Extracto Abr 2026 — en revisión IA",
    monto: 0,
    fecha: "15 may",
  },
];
