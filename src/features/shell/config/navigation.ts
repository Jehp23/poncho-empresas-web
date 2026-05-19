import type { LucideIcon } from "lucide-react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  Brain,
  ChartLine,
  FileText,
  Home,
  Landmark,
  Settings,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  destacado?: boolean;
  pronto?: boolean;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "General",
    items: [
      { label: "Inicio", href: "/inicio", icon: Home },
      { label: "Movimientos", href: "/movimientos", icon: ArrowLeftRight },
      { label: "Transferencias", href: "/transferencias", icon: Wallet },
      { label: "Depósitos", href: "/depositos", icon: ArrowDownToLine },
    ],
  },
  {
    label: "Finanzas",
    items: [
      { label: "eCheqs", href: "/echeqs", icon: FileText },
      { label: "Cuenta remunerada", href: "/cuenta-remunerada", icon: TrendingUp, pronto: true },
      { label: "CashFlow", href: "/cashflow", icon: ChartLine, pronto: true },
      { label: "Consolidación (IA)", href: "/consolidacion", icon: Brain, pronto: true },
      { label: "Financiamiento", href: "/financiamiento", icon: Landmark, destacado: true },
    ],
  },
  {
    label: "Sistema",
    items: [
      { label: "Usuarios", href: "/usuarios", icon: Users, pronto: true },
      { label: "Ajustes", href: "/ajustes", icon: Settings, pronto: true },
    ],
  },
];

/** Flat list for mobile / utilities */
export const ALL_NAV_ITEMS = NAV_SECTIONS.flatMap((s) => s.items);

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/inicio") return pathname === "/inicio";
  return pathname === href || pathname.startsWith(`${href}/`);
}
