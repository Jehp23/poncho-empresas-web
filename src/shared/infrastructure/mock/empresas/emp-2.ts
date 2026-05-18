import type { DashboardData } from "@/shared/types/app";

export const MOCK_EMP_2: DashboardData = {
  empresa: {
    id: "emp-2",
    nombre: "Distribuidora Norte",
    cuit: "30-70998877-1",
  },
  usuario: {
    nombre: "María",
    rol: "admin",
  },
  empresas: [],
  asesor: {
    salud: "atencion",
    titulo: "Salud financiera: Requiere atención",
    mensaje:
      "El flujo de caja proyectado cae en 18 días. Priorizá cobros pendientes y evaluá financiamiento de corto plazo.",
    asesor: "Lucas R. — Asesor Poncho",
    actualizadoEn: "Hoy, 08:30",
  },
  saldoTotal: 3_840_500,
  variacionMes: -2.1,
  cuentas: [
    {
      id: "c1",
      nombre: "Cuenta operativa",
      detalle: "Galicia · *8812",
      saldo: 2_100_000,
      tipo: "operativa",
    },
    {
      id: "c2",
      nombre: "Cuenta remunerada",
      detalle: "FCI Money Market",
      saldo: 540_500,
      tipo: "remunerada",
    },
    {
      id: "c3",
      nombre: "Pagos / Proveedores",
      detalle: "Reservado",
      saldo: 800_000,
      tipo: "pagos",
    },
    {
      id: "c4",
      nombre: "Cobros / Clientes",
      detalle: "Por acreditar",
      saldo: 400_000,
      tipo: "cobros",
    },
  ],
  echeqs: {
    emitidosMonto: 210_000,
    emitidosPendientes: 4,
    recibidosMonto: 380_000,
    recibidosPorCobrar: 3,
  },
  proximosPagos: [
    { id: "p1", descripcion: "Proveedor mayorista", fecha: "Hoy", urgente: true },
    { id: "p2", descripcion: "Alquiler depósito", fecha: "19 may", urgente: true },
  ],
  facturasPorCobrar: [
    { id: "f1", cliente: "Supermercados del Sur", monto: 95_000, vence: "18 may" },
    { id: "f2", cliente: "Mayorista Central", monto: 42_300, vence: "25 may" },
  ],
  financiamiento: {
    estado: "no_iniciado",
    score: null,
    mensaje: "Iniciá tu pre-calificación para acceder a líneas SGR.",
    pasosTotal: 10,
  },
  actividad: [
    {
      id: "a1",
      fecha: "Hoy, 11:00",
      tipo: "transferencia",
      descripcion: "Pago flete — Transportes Norte",
      monto: 85_000,
      esEgreso: true,
      estado: "completado",
    },
    {
      id: "a2",
      fecha: "Ayer, 16:20",
      tipo: "echeq",
      descripcion: "eCheq recibido — Supermercados del Sur",
      monto: 95_000,
      esEgreso: false,
      estado: "pendiente",
    },
  ],
};
