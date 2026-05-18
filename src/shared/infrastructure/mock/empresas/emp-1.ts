import type { DashboardData } from "@/shared/types/app";

export const MOCK_EMP_1: DashboardData = {
  empresa: {
    id: "emp-1",
    nombre: "Tech Solutions S.A.",
    cuit: "30-71234567-8",
  },
  usuario: {
    nombre: "María",
    rol: "admin",
  },
  empresas: [],
  asesor: {
    salud: "estable",
    titulo: "Salud financiera: Estable",
    mensaje:
      "Tu liquidez cubre aproximadamente 2,1 meses de gastos operativos. Tenés 3 pagos críticos en los próximos 15 días.",
    asesor: "Lucas R. — Asesor Poncho",
    actualizadoEn: "Hoy, 09:00",
  },
  saldoTotal: 12_582_210,
  variacionMes: 4.2,
  cuentas: [
    {
      id: "c1",
      nombre: "Cuenta operativa",
      detalle: "Santander · *4920",
      saldo: 6_038_617,
      tipo: "operativa",
    },
    {
      id: "c2",
      nombre: "Cuenta remunerada",
      detalle: "FCI Money Market",
      saldo: 1_323_267,
      tipo: "remunerada",
    },
    {
      id: "c3",
      nombre: "Pagos / Proveedores",
      detalle: "Reservado",
      saldo: 1_149_093,
      tipo: "pagos",
    },
    {
      id: "c4",
      nombre: "Cobros / Clientes",
      detalle: "Por acreditar",
      saldo: 226_727,
      tipo: "cobros",
    },
  ],
  echeqs: {
    emitidosMonto: 450_000,
    emitidosPendientes: 12,
    recibidosMonto: 920_000,
    recibidosPorCobrar: 6,
  },
  proximosPagos: [
    { id: "p1", descripcion: "AFIP — IVA", fecha: "Mañana", urgente: true },
    { id: "p2", descripcion: "Proveedor Logística SA", fecha: "22 may", urgente: false },
    { id: "p3", descripcion: "Sueldos — quincena", fecha: "28 may", urgente: false },
  ],
  facturasPorCobrar: [
    { id: "f1", cliente: "Globant SA", monto: 125_000, vence: "20 may" },
    { id: "f2", cliente: "Retail Max", monto: 68_400, vence: "24 may" },
    { id: "f3", cliente: "Servicios Andinos", monto: 33_200, vence: "30 may" },
  ],
  financiamiento: {
    estado: "en_progreso",
    score: 78,
    mensaje: 'Completá la carpeta para ampliar tu cupo pre-aprobado.',
    pasoActual: 3,
    pasosTotal: 10,
  },
  actividad: [
    {
      id: "a1",
      fecha: "Hoy, 14:32",
      tipo: "transferencia",
      descripcion: "Pago proveedor — Amazon Web Services",
      monto: 2_450,
      esEgreso: true,
      estado: "completado",
    },
    {
      id: "a2",
      fecha: "Hoy, 09:15",
      tipo: "deposito",
      descripcion: "Acreditación — Stripe Payout",
      monto: 15_800,
      esEgreso: false,
      estado: "completado",
    },
    {
      id: "a3",
      fecha: "Ayer, 18:45",
      tipo: "echeq",
      descripcion: "eCheq emitido — Globant SA",
      monto: 125_000,
      esEgreso: false,
      estado: "pendiente",
    },
  ],
};
