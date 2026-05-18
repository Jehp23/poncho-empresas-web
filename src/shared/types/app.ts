export type SaludFinanciera = "excelente" | "estable" | "atencion";

export type EstadoActividad =
  | "completado"
  | "pendiente"
  | "en_revision"
  | "requiere_atencion";

export type EstadoFinanciamiento =
  | "no_iniciado"
  | "en_progreso"
  | "en_revision"
  | "aprobado"
  | "requiere_accion";

export interface Empresa {
  id: string;
  nombre: string;
  cuit: string;
}

export interface Usuario {
  nombre: string;
  rol: "admin" | "finanzas" | "tesoreria" | "contador";
}

export interface MensajeAsesor {
  salud: SaludFinanciera;
  titulo: string;
  mensaje: string;
  asesor: string;
  actualizadoEn: string;
}

export interface Cuenta {
  id: string;
  nombre: string;
  detalle: string;
  saldo: number;
  tipo: "operativa" | "remunerada" | "pagos" | "cobros";
}

export interface ResumenEcheqs {
  emitidosMonto: number;
  emitidosPendientes: number;
  recibidosMonto: number;
  recibidosPorCobrar: number;
}

export interface Vencimiento {
  id: string;
  descripcion: string;
  fecha: string;
  urgente?: boolean;
}

export interface FacturaPorCobrar {
  id: string;
  cliente: string;
  monto: number;
  vence: string;
}

export interface FinanciamientoResumen {
  estado: EstadoFinanciamiento;
  score: number | null;
  mensaje: string;
  pasoActual?: number;
  pasosTotal: number;
}

export interface ActividadReciente {
  id: string;
  fecha: string;
  tipo: "transferencia" | "deposito" | "echeq" | "inversion";
  descripcion: string;
  monto: number;
  esEgreso: boolean;
  estado: EstadoActividad;
}

export interface DashboardData {
  empresa: Empresa;
  usuario: Usuario;
  empresas: Empresa[];
  asesor: MensajeAsesor;
  saldoTotal: number;
  variacionMes: number;
  cuentas: Cuenta[];
  echeqs: ResumenEcheqs;
  proximosPagos: Vencimiento[];
  facturasPorCobrar: FacturaPorCobrar[];
  financiamiento: FinanciamientoResumen;
  actividad: ActividadReciente[];
}
