import type { DashboardData, Empresa } from "@/shared/types/app";
import { MOCK_EMP_1 } from "./empresas/emp-1";
import { MOCK_EMP_2 } from "./empresas/emp-2";

export const DEFAULT_EMPRESA_ID = "emp-1";

export const MOCK_EMPRESAS: Empresa[] = [
  { id: "emp-1", nombre: "Tech Solutions S.A.", cuit: "30-71234567-8" },
  { id: "emp-2", nombre: "Distribuidora Norte", cuit: "30-70998877-1" },
];

const MOCK_BY_ID: Record<string, DashboardData> = {
  "emp-1": MOCK_EMP_1,
  "emp-2": MOCK_EMP_2,
};

export function getDashboardData(empresaId: string): DashboardData {
  const base = MOCK_BY_ID[empresaId] ?? MOCK_EMP_1;
  return { ...base, empresas: MOCK_EMPRESAS };
}

export function getEmpresa(id: string): Empresa {
  return MOCK_EMPRESAS.find((e) => e.id === id) ?? MOCK_EMPRESAS[0];
}
