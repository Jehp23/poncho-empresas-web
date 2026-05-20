"use client";

import {
  ArrowDownToLine,
  ChevronDown,
  FileText,
  Landmark,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { canUseAccion } from "@/features/shell/domain/roles";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import { NotificacionesPanel } from "@/features/shell/delivery/components/notificaciones-panel";
import { RoleBadge } from "@/features/shell/delivery/components/role-badge";
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

function getGreeting(nombre: string): string {
  const h = new Date().getHours();
  if (h < 13) return `Buenos días, ${nombre}`;
  if (h < 20) return `Buenas tardes, ${nombre}`;
  return `Buenas noches, ${nombre}`;
}

function getDateLabel(): string {
  return new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EmpresaSwitcher() {
  const { empresa, empresas, setEmpresaId } = useEmpresa();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg px-3 py-1.5 transition-colors hover:border-primary"
        aria-expanded={open}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
        <div className="hidden text-left sm:block">
          <p className="text-[12px] font-semibold leading-tight text-ink">
            {empresa.nombre}
          </p>
          <p className="text-[10px] text-muted">{empresa.cuit}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul className="absolute right-0 z-50 mt-1.5 w-64 overflow-hidden rounded-xl border border-border-subtle bg-surface py-1 shadow-hover">
          {empresas.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => {
                  setEmpresaId(e.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full flex-col px-4 py-2.5 text-left transition-colors hover:bg-surface-muted",
                  e.id === empresa.id && "bg-primary-soft/40",
                )}
              >
                <span className="text-sm font-semibold text-ink">{e.nombre}</span>
                <span className="text-xs text-faint">CUIT {e.cuit}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Topbar() {
  const { data } = useEmpresa();
  const rol = data.usuario.rol;
  const acciones = ACCIONES.filter((a) => canUseAccion(rol, a.label));

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border-subtle bg-surface px-4 shadow-xs sm:gap-4 sm:px-6 lg:pl-6">
      <div className="min-w-0 flex-1 pl-10 lg:pl-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="font-display text-[14px] font-semibold leading-tight text-ink sm:text-[15px]">
            {getGreeting(data.usuario.nombre)} 👋
          </h2>
          <RoleBadge rol={rol} className="hidden text-[10px] sm:inline-flex" />
        </div>
        <p className="mt-0.5 hidden text-[11px] capitalize text-muted sm:block">
          {getDateLabel()}
        </p>
      </div>

      <div className="hidden items-center gap-1.5 lg:flex">
        {acciones.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.label}
              href={a.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition-colors duration-150",
                "accent" in a && a.accent
                  ? "bg-accent text-ink hover:bg-accent-hover"
                  : "bg-bg text-muted hover:bg-surface-muted hover:text-ink",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {a.label}
            </Link>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <EmpresaSwitcher />
        <NotificacionesPanel />
      </div>
    </header>
  );
}
