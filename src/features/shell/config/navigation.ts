import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  Building2,
  FileText,
  Home,
  Landmark,
  Settings,
  Users,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  destacado?: boolean;
  pronto?: boolean;
};

/** Sidebar principal — máx. 5 ítems, sin secciones (ver DESIGN.md §8) */
export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/inicio", icon: Home },
  { label: "Operar", href: "/operar", icon: ArrowLeftRight },
  { label: "eCheqs", href: "/echeqs", icon: FileText },
  { label: "Bancos", href: "/consolidacion", icon: Building2 },
  { label: "Financiamiento", href: "/financiamiento", icon: Landmark },
];

/** Menú del usuario — configuración ocasional, no en sidebar principal */
export const USER_MENU_ITEMS: NavItem[] = [
  { label: "Ajustes", href: "/ajustes", icon: Settings },
  { label: "Usuarios", href: "/usuarios", icon: Users },
];

/** @deprecated Usar NAV_ITEMS — mantenido por compatibilidad temporal */
export const NAV_SECTIONS = [{ label: "", items: NAV_ITEMS }];

/** @deprecated Usar NAV_ITEMS */
export const ALL_NAV_ITEMS = NAV_ITEMS;

const OPERAR_PATHS = ["/operar", "/movimientos", "/transferencias", "/depositos"];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/inicio") return pathname === "/inicio";
  if (href === "/operar") {
    return OPERAR_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
