import type { DashboardData, Empresa, Usuario } from "@/shared/types/app";
import type { RolUsuario } from "./roles";

export interface EmpresaContextValue {
  empresaId: string;
  empresa: Empresa;
  empresas: Empresa[];
  data: DashboardData;
  setEmpresaId: (id: string) => void;
  /** Demo — cambiar rol sin re-login */
  setRolDemo: (rol: RolUsuario | null) => void;
  /** true cuando API real falló y se usa mock de respaldo */
  apiDegraded: boolean;
  /** Demo — simular error de conexión */
  simulateOffline: boolean;
  setSimulateOffline: (value: boolean) => void;
  retryApi: () => void;
  dismissApiBanner: () => void;
  showApiBanner: boolean;
}

export const EMPRESA_STORAGE_KEY = "pe:empresaId";
export const SESSION_STORAGE_KEY = "pe:session";

export type { RolUsuario };
