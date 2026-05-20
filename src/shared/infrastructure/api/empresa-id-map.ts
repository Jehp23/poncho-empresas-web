/**
 * Mapeo entre los IDs de empresa del front (strings cortos del mock)
 * y los UUIDs reales de la API.
 *
 * Se elimina cuando el backend implemente onboarding real
 * y los IDs vengan como UUID desde el origen.
 */
export const EMPRESA_UUID_MAP: Record<string, string> = {
  'emp-1': '11111111-1111-4111-8111-111111111111',
  'emp-2': '22222222-2222-4222-8222-222222222222',
};

export function toApiEmpresaId(localId: string): string {
  return EMPRESA_UUID_MAP[localId] ?? localId;
}

export function toLocalEmpresaId(uuid: string): string {
  const entry = Object.entries(EMPRESA_UUID_MAP).find(([, v]) => v === uuid);
  return entry ? entry[0] : uuid;
}
