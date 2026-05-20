"use client";

import Link from "next/link";
import {
  ArrowDownToLine,
  FileText,
  Landmark,
  Send,
} from "lucide-react";
import { canUseAccion } from "@/features/shell/domain/roles";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import { cn } from "@/shared/lib/cn";

const ACCIONES = [
  { label: "Enviar", href: "/operar?tab=transferir", icon: Send },
  { label: "Recibir", href: "/operar?tab=depositar", icon: ArrowDownToLine },
  { label: "eCheqs", href: "/echeqs", icon: FileText },
  {
    label: "Financiamiento",
    href: "/financiamiento",
    icon: Landmark,
    accent: true,
  },
] as const;

/** Acciones frecuentes en mobile — barra inferior fija */
export function MobileQuickActions() {
  const { data } = useEmpresa();
  const rol = data.usuario.rol;
  const visible = ACCIONES.filter((a) => canUseAccion(rol, a.label));

  if (visible.length === 0) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-subtle bg-surface/95 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden"
      aria-label="Acciones rápidas"
    >
      <ul className="mx-auto flex max-w-lg items-center justify-around gap-1">
        {visible.map((a) => {
          const Icon = a.icon;
          return (
            <li key={a.label} className="flex-1">
              <Link
                href={a.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-semibold transition-colors",
                  "accent" in a && a.accent
                    ? "text-amber-900"
                    : "text-muted hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    "accent" in a && a.accent
                      ? "bg-accent text-ink"
                      : "bg-bg text-muted",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {a.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
