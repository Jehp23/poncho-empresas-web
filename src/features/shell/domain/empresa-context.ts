import type { DashboardData, Empresa } from "@/shared/types/app";

export interface EmpresaContextValue {
  empresaId: string;
  empresa: Empresa;
  empresas: Empresa[];
  data: DashboardData;
  setEmpresaId: (id: string) => void;
}

export const EMPRESA_STORAGE_KEY = "pe:empresaId";
export const SESSION_STORAGE_KEY = "pe:session";
