/**
 * Contratos HTTP del backend Poncho Empresas — referencia para integración.
 * Modo demo: el front usa mock; con NEXT_PUBLIC_USE_REAL_API=true llama estos paths.
 */
import type { DashboardData } from "@/shared/types/app";

/** Rutas base */
export const API_V1 = "/api/v1" as const;

/** Endpoints documentados */
export const API_ENDPOINTS = {
  me: `${API_V1}/me`,
  dashboard: (empresaId: string) =>
    `${API_V1}/empresas/${empresaId}/dashboard` as const,
  movimientos: (empresaId: string) =>
    `${API_V1}/empresas/${empresaId}/movimientos` as const,
  transferencias: (empresaId: string) =>
    `${API_V1}/empresas/${empresaId}/transferencias` as const,
  echeqs: (empresaId: string) => `${API_V1}/empresas/${empresaId}/echeqs` as const,
  bancosConsolidacion: (empresaId: string) =>
    `${API_V1}/empresas/${empresaId}/bancos/consolidacion` as const,
  financiamiento: (empresaId: string) =>
    `${API_V1}/empresas/${empresaId}/financiamiento` as const,
} as const;

/** Respuestas tipadas (subset — extender al conectar backend) */
export type DashboardResponse = DashboardData;

export type TransferenciaRequest = {
  destinatario: string;
  monto: number;
  concepto?: string;
  cuentaOrigenId: string;
};

export type TransferenciaResponse = {
  id: string;
  estado: "pendiente" | "completado" | "rechazado";
  referencia: string;
};

export type EmitirEcheqRequest = {
  beneficiario: string;
  cuit: string;
  monto: number;
  vencimientoDias: number;
};

export type EmitirEcheqResponse = {
  id: string;
  numero: string;
  estado: "pendiente" | "emitido";
};

export type ImportarExtractoResponse = {
  id: string;
  movimientosImportados: number;
  pendientesConciliar: number;
};

export type ApiErrorBody = {
  code: string;
  detail: string;
};
