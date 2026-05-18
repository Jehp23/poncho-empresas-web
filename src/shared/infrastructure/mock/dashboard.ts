import type { DashboardData } from "@/shared/types/app";
import {
  DEFAULT_EMPRESA_ID,
  getDashboardData,
} from "./index";

/** @deprecated Usar getDashboardData(empresaId) */
export const MOCK_DASHBOARD: DashboardData = getDashboardData(DEFAULT_EMPRESA_ID);

export { getDashboardData, DEFAULT_EMPRESA_ID, MOCK_EMPRESAS } from "./index";
