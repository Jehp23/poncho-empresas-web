import type { Usuario } from "@/shared/types/app";
import type { NavItem } from "@/features/shell/config/navigation";
import { NAV_ITEMS } from "@/features/shell/config/navigation";

export type RolUsuario = Usuario["rol"];

export const ROL_LABELS: Record<RolUsuario, string> = {
  admin: "Administrador",
  finanzas: "Finanzas",
  tesoreria: "Tesorería",
  contador: "Contador",
};

export const ROL_STORAGE_KEY = "pe:rolDemo";

/** Rutas permitidas por rol — demo de permisos */
const RUTAS_POR_ROL: Record<RolUsuario, string[]> = {
  admin: NAV_ITEMS.map((i) => i.href),
  finanzas: ["/inicio", "/operar", "/echeqs", "/consolidacion", "/financiamiento"],
  tesoreria: ["/inicio", "/operar", "/echeqs", "/consolidacion"],
  contador: ["/inicio", "/consolidacion", "/echeqs"],
};

const ACCIONES_POR_ROL: Record<RolUsuario, string[]> = {
  admin: ["Enviar", "Recibir", "eCheqs", "Financiamiento"],
  finanzas: ["Enviar", "Recibir", "eCheqs", "Financiamiento"],
  tesoreria: ["Enviar", "Recibir", "eCheqs"],
  contador: ["eCheqs"],
};

export function getNavItemsForRole(rol: RolUsuario): NavItem[] {
  const allowed = RUTAS_POR_ROL[rol];
  return NAV_ITEMS.filter((item) => allowed.includes(item.href));
}

export function canAccessRoute(rol: RolUsuario, pathname: string): boolean {
  const allowed = RUTAS_POR_ROL[rol];
  if (allowed.some((r) => pathname === r || pathname.startsWith(`${r}/`))) {
    return true;
  }
  // Rutas secundarias accesibles para todos con sesión
  const secundarias = ["/ajustes", "/cashflow", "/cuenta-remunerada", "/mas"];
  if (secundarias.some((r) => pathname === r || pathname.startsWith(`${r}/`))) {
    return true;
  }
  // Usuarios solo admin
  if (pathname.startsWith("/usuarios")) return rol === "admin";
  return false;
}

export function canUseAccion(rol: RolUsuario, label: string): boolean {
  return ACCIONES_POR_ROL[rol].includes(label);
}

export function canManageUsuarios(rol: RolUsuario): boolean {
  return rol === "admin";
}

export function getRolDescripcion(rol: RolUsuario): string {
  switch (rol) {
    case "admin":
      return "Acceso completo · gestión de usuarios";
    case "finanzas":
      return "Operaciones y financiamiento";
    case "tesoreria":
      return "Operaciones diarias · sin financiamiento";
    case "contador":
      return "Consulta bancos y eCheqs · solo lectura operativa";
  }
}
