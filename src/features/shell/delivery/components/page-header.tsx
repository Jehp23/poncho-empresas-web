"use client";

import { Bell, ChevronDown, FileText, ArrowDownToLine, ArrowLeftRight } from "lucide-react";
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

function fechaHoy(): string {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

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
        <span className="max-w-[140px] truncate font-medium text-ink sm:max-w-[200px]">
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

function QuickActions() {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Link href="/operar?tab=transferir">
        <Button variant="secondary" className="h-9 px-4 text-xs">
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Transferir
        </Button>
      </Link>
      <Link href="/operar?tab=depositar">
        <Button variant="secondary" className="h-9 px-4 text-xs">
          <ArrowDownToLine className="h-3.5 w-3.5" />
          Depositar
        </Button>
      </Link>
      <Link href="/echeqs">
        <Button variant="secondary" className="h-9 px-4 text-xs">
          <FileText className="h-3.5 w-3.5" />
          eCheq
        </Button>
      </Link>
    </div>
  );
}

export function PageHeader({ usuario, titulo, subtitulo }: PageHeaderProps) {
  const { empresa } = useEmpresa();

  return (
    <header className="mb-8 border-b border-primary/10 pb-6 pt-12 lg:pt-0">
      <div className="gradient-accent-bar mb-6 h-1 w-16 rounded-full opacity-80" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-label capitalize">{fechaHoy()}</p>
          <h1 className="font-poncho mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-[1.625rem]">
            {titulo ?? empresa.nombre}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {subtitulo ?? `Hola, ${usuario.nombre} — acá tenés el resumen de tu empresa.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <QuickActions />
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
    </header>
  );
}
