import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  ChartLine,
  FileText,
  Home,
  Landmark,
  MoreHorizontal,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  destacado?: boolean;
  pronto?: boolean;
};

export const PRIMARY_NAV: NavItem[] = [
  { label: "Inicio", href: "/inicio", icon: Home },
  { label: "Operar", href: "/operar", icon: ArrowLeftRight },
  { label: "eCheqs", href: "/echeqs", icon: FileText },
  {
    label: "Financiar",
    href: "/financiamiento",
    icon: Landmark,
    destacado: true,
  },
  { label: "Más", href: "/mas", icon: MoreHorizontal },
];

export const SECONDARY_MODULES: NavItem[] = [
  {
    label: "Cuenta remunerada",
    href: "/cuenta-remunerada",
    icon: TrendingUp,
    pronto: true,
  },
  { label: "CashFlow", href: "/cashflow", icon: ChartLine, pronto: true },
  { label: "Usuarios", href: "/usuarios", icon: Users, pronto: true },
  { label: "Ajustes", href: "/ajustes", icon: Settings, pronto: true },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/inicio") return pathname === "/inicio";
  return pathname === href || pathname.startsWith(`${href}/`);
}
