import type { BancoConectado, ConsolidacionData, MovimientoBanco } from "./types";
import type { MensajeAsesor } from "@/shared/types/app";

export const MOCK_BANCOS: BancoConectado[] = [
  {
    id: "galicia",
    nombre: "Banco Galicia",
    tipo: "banco_externo",
    subtitulo: "CC Operativa · CBU 0070-1234****",
    color: "#4ade80",
    saldo: 28_450_500,
    ingresosMes: 9_200_000,
    egresosMes: 5_800_000,
    estado: "sincronizado",
    ultimoMovimiento: "hace 2h",
    porcentajeTotal: 38,
  },
  {
    id: "macro",
    nombre: "Banco Macro",
    tipo: "banco_externo",
    subtitulo: "CA en Pesos · CBU 2850-9876****",
    color: "#fbbf24",
    saldo: 12_670_000,
    ingresosMes: 3_800_000,
    egresosMes: 2_410_000,
    estado: "sincronizado",
    ultimoMovimiento: "hace 5h",
    porcentajeTotal: 17,
  },
  {
    id: "nacion",
    nombre: "Banco Nación",
    tipo: "banco_externo",
    subtitulo: "CC Corriente · CBU 0110-4512****",
    color: "#60a5fa",
    saldo: 7_200_000,
    ingresosMes: 1_800_000,
    egresosMes: 1_030_000,
    estado: "actualizando",
    ultimoMovimiento: "hace 12h",
    porcentajeTotal: 10,
  },
  {
    id: "wallet",
    nombre: "Poncho Wallet",
    tipo: "poncho_wallet",
    subtitulo: "Cuenta comitente · Broker Poncho",
    color: "#c084fc",
    saldo: 25_600_000,
    ingresosMes: 0,
    egresosMes: 0,
    estado: "sincronizado",
    ultimoMovimiento: "tiempo real",
    porcentajeTotal: 35,
    saldoDisponible: 12_800_000,
    saldoRemunerado: 12_800_000,
    tnaRemunerada: 97.5,
    rendimientoHoy: 34_520,
    rendimientoMes: 1_024_000,
    fechaInversion: "01 abr",
  },
];

export const MOCK_CONSOLIDACION: ConsolidacionData = {
  saldoTotal: 73_920_500,
  variacionMes: 11.2,
  ingresosMes: 14_800_000,
  cantidadAcreditaciones: 47,
  egresosMes: 9_240_000,
  cantidadDebitos: 83,
  resultadoNeto: 5_560_000,
  ultimaActualizacion: "hace 18 min",
  bancos: MOCK_BANCOS,
};

export const MOCK_INSIGHT_BANCOS: MensajeAsesor = {
  salud: "atencion",
  titulo: "Conciliación pendiente",
  mensaje:
    "Galicia tiene 3 débitos automáticos sin categorizar y el extracto de Nación está en revisión. Conviene resolverlo antes del cierre de mes.",
  asesor: "Lucas R. — Asesor Poncho",
  actualizadoEn: "hace 18 min",
};

export const MOCK_MOVIMIENTOS_BANCO: MovimientoBanco[] = [
  { id: "mb1",  fecha: "19 may · 14:32", bancoId: "galicia", bancoNombre: "Galicia",       descripcion: "Cobranza cliente — Distribuidora Sol",  categoria: "Cobros",          monto: 1_850_000, tipo: "credito", estado: "completado" },
  { id: "mb2",  fecha: "19 may · 11:20", bancoId: "macro",   bancoNombre: "Macro",         descripcion: "Pago proveedor — LogiTrans SRL",         categoria: "Proveedores",     monto: 680_000,   tipo: "debito",  estado: "completado" },
  { id: "mb3",  fecha: "19 may · 09:05", bancoId: "wallet",  bancoNombre: "Poncho Wallet", descripcion: "Rendimiento diario FCI Money Market",    categoria: "Inversiones",     monto: 34_520,    tipo: "credito", estado: "completado" },
  { id: "mb4",  fecha: "18 may · 18:00", bancoId: "galicia", bancoNombre: "Galicia",       descripcion: "Débito automático — Seguro Río",         categoria: "Seguros",         monto: 245_000,   tipo: "debito",  estado: "completado" },
  { id: "mb5",  fecha: "18 may · 15:45", bancoId: "nacion",  bancoNombre: "Nación",        descripcion: "Transferencia recibida — Tech Parts SA",  categoria: "Cobros",         monto: 920_000,   tipo: "credito", estado: "completado" },
  { id: "mb6",  fecha: "18 may · 12:30", bancoId: "macro",   bancoNombre: "Macro",         descripcion: "AFIP — IVA período abril",               categoria: "Impuestos",       monto: 1_240_000, tipo: "debito",  estado: "completado" },
  { id: "mb7",  fecha: "17 may · 16:00", bancoId: "galicia", bancoNombre: "Galicia",       descripcion: "Extracto importado — IA concilió 247 mov", categoria: "Importación IA", monto: 0,        tipo: "credito", estado: "en_revision" },
  { id: "mb8",  fecha: "17 may · 10:00", bancoId: "wallet",  bancoNombre: "Poncho Wallet", descripcion: "Suscripción FCI Renta Fija",             categoria: "Inversiones",     monto: 2_500_000, tipo: "debito",  estado: "completado" },
  { id: "mb9",  fecha: "16 may · 09:30", bancoId: "nacion",  bancoNombre: "Nación",        descripcion: "Pago servicio — Telecom empresas",       categoria: "Servicios",       monto: 87_000,    tipo: "debito",  estado: "completado" },
  { id: "mb10", fecha: "15 may · 14:00", bancoId: "galicia", bancoNombre: "Galicia",       descripcion: "Vencimiento eCheq — Proveedor Norte",    categoria: "eCheqs",          monto: 680_000,   tipo: "debito",  estado: "pendiente"  },
  { id: "mb11", fecha: "15 may · 11:00", bancoId: "macro",   bancoNombre: "Macro",         descripcion: "Cobro exportación — Retail Max",         categoria: "Cobros",          monto: 3_200_000, tipo: "credito", estado: "completado" },
  { id: "mb12", fecha: "14 may · 16:20", bancoId: "galicia", bancoNombre: "Galicia",       descripcion: "Transferencia a Macro — gestión caja",   categoria: "Interbancos",     monto: 1_500_000, tipo: "debito",  estado: "completado" },
];
