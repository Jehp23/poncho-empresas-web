export type EstadoBanco = "sincronizado" | "actualizando" | "error" | "desconectado";

export type TipoBanco = "banco_externo" | "poncho_wallet";

export interface BancoConectado {
  id: string;
  nombre: string;
  tipo: TipoBanco;
  subtitulo: string;
  color: string;
  saldo: number;
  ingresosMes: number;
  egresosMes: number;
  estado: EstadoBanco;
  ultimoMovimiento: string;
  porcentajeTotal: number;
  // Solo Poncho Wallet
  saldoDisponible?: number;
  saldoRemunerado?: number;
  tnaRemunerada?: number;
  rendimientoHoy?: number;
  rendimientoMes?: number;
  fechaInversion?: string;
}

export interface ConsolidacionData {
  saldoTotal: number;
  variacionMes: number;
  ingresosMes: number;
  cantidadAcreditaciones: number;
  egresosMes: number;
  cantidadDebitos: number;
  resultadoNeto: number;
  ultimaActualizacion: string;
  bancos: BancoConectado[];
}

export type TipoMovBanco = "credito" | "debito";
export type EstadoMovBanco = "completado" | "pendiente" | "en_revision";

export interface MovimientoBanco {
  id: string;
  fecha: string;
  bancoId: string;
  bancoNombre: string;
  descripcion: string;
  categoria: string;
  monto: number;
  tipo: TipoMovBanco;
  estado: EstadoMovBanco;
}

export type FiltroMovimiento = "todos" | "credito" | "debito" | "pendiente";
