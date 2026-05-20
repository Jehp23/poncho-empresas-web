import type { Empresa, Usuario } from '@/shared/types/app';
import { apiGet } from './client';

interface MeResponse {
  usuario: Usuario;
  empresas: Empresa[];
}

export async function getMe(): Promise<MeResponse> {
  return apiGet<MeResponse>('/api/v1/me');
}
