"use client";

import {
  ArrowDownToLine,
  ArrowLeftRight,
  Bell,
  ChevronDown,
  FileText,
  Plus,
  Receipt,
  Send,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import type { Usuario } from "@/shared/types/app";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";

type PageHeaderProps = {
  usuario: Usuario;
  titulo?: string;
  subtitulo?: string;
};

const QUICK_ACTIONS: Array<{
  label: string;
  href: string;
  icon: typeof Send;
  primary?: boolean;
}> = [
  { label: "Transferir", href: "/transferencias", icon: Send, primary: true },
  { label: "Depositar", href: "/depositos", icon: Plus },
  { label: "Transferir eCheq", href: "/echeqs?tab=emitidos", icon: ArrowLeftRight },
  { label: "Depositar eCheq", href: "/echeqs?tab=recibidos", icon: FileText },
  { label: "Pagar proveedores", href: "/transferencias", icon: Users },
  { label: "Crear factura", href: "/depositos", icon: Receipt },
];

function CompanySwitcher() {
  const { empresa, empresas, setEmpresaId } = useEmpresa();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 text-sm shadow-sm transition-colors hover:bg-surface-muted"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-faint">
          Empresa:
        </span>
        <span className="max-w-[140px] truncate font-semibold text-ink sm:max-w-[180px]">
          {empresa.nombre}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-faint" aria-hidden />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border-subtle bg-surface py-1 shadow-hover"
        >
          {empresas.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                role="option"
                aria-selected={e.id === empresa.id}
                onClick={() => {
                  setEmpresaId(e.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full flex-col px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface-muted",
                  e.id === empresa.id && "bg-primary-soft/50",
                )}
              >
                <span className="font-medium text-ink">{e.nombre}</span>
                <span className="text-xs text-faint">CUIT {e.cuit}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function PageHeader({ usuario, titulo, subtitulo }: PageHeaderProps) {
  const { empresa } = useEmpresa();

  return (
    <header className="mb-8 border-b border-border-subtle pb-6 pt-12 lg:pt-0">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.625rem]">
            {titulo ?? `Bienvenido, ${usuario.nombre}`}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {subtitulo ?? `Acá tenés el resumen de ${empresa.nombre} hoy.`}
          </p>
        </div>

        <div className="flex min-w-0 flex-col items-stretch gap-3 xl:flex-row xl:items-center xl:justify-end">
          <div className="hidden flex-wrap items-center justify-end gap-2 lg:flex">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href}>
                  <Button
                    variant={action.primary ? "primary" : "secondary"}
                    className="h-9 whitespace-nowrap px-3 text-xs"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {action.label}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="flex shrink-0 items-center justify-end gap-2">
            <CompanySwitcher />
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-sm transition-colors hover:bg-surface-muted"
              aria-label="Notificaciones"
            >
              <Bell className="h-[18px] w-[18px] text-muted" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile quick actions */}
      <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
        <Link href="/transferencias">
          <Button className="h-9 shrink-0 px-4 text-xs">
            <Send className="h-3.5 w-3.5" />
            Transferir
          </Button>
        </Link>
        <Link href="/depositos">
          <Button variant="secondary" className="h-9 shrink-0 px-4 text-xs">
            <ArrowDownToLine className="h-3.5 w-3.5" />
            Depositar
          </Button>
        </Link>
        <Link href="/echeqs">
          <Button variant="secondary" className="h-9 shrink-0 px-4 text-xs">
            <FileText className="h-3.5 w-3.5" />
            eCheq
          </Button>
        </Link>
      </div>
    </header>
  );
}
