import type { DashboardData } from '@/shared/types/app';
import { apiGet } from './client';
import { toApiEmpresaId } from './empresa-id-map';

export async function getDashboardDataFromApi(
  empresaId: string,
): Promise<DashboardData> {
  const apiId = toApiEmpresaId(empresaId);
  return apiGet<DashboardData>(`/api/v1/empresas/${apiId}/dashboard`);
}
