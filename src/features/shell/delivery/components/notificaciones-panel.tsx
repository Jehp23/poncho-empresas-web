"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  MOCK_NOTIFICACIONES,
  type NotificacionItem,
} from "@/features/shell/domain/notificaciones";
import { cn } from "@/shared/lib/cn";

export function NotificacionesPanel() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificacionItem[]>(MOCK_NOTIFICACIONES);
  const ref = useRef<HTMLDivElement>(null);

  const noLeidas = items.filter((n) => !n.leida).length;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function marcarLeida(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n)),
    );
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg text-muted transition-colors hover:bg-surface-muted"
        aria-label="Notificaciones"
        aria-expanded={open}
      >
        <Bell className="h-4 w-4" />
        {noLeidas > 0 && (
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger ring-1 ring-surface" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-hover">
          <div className="border-b border-border-subtle px-4 py-3">
            <p className="text-sm font-semibold text-ink">Notificaciones</p>
            {noLeidas > 0 && (
              <p className="text-xs text-muted">{noLeidas} sin leer</p>
            )}
          </div>
          <ul className="max-h-80 overflow-y-auto py-1">
            {items.map((n) => {
              const Icon = n.icon;
              return (
                <li key={n.id}>
                  <Link
                    href={n.href}
                    onClick={() => marcarLeida(n.id)}
                    className={cn(
                      "flex gap-3 px-4 py-3 transition-colors hover:bg-surface-muted",
                      !n.leida && "bg-primary-soft/20",
                    )}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink">{n.titulo}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        {n.mensaje}
                      </p>
                      <p className="mt-1 text-[10px] text-faint">{n.hace}</p>
                    </div>
                    {!n.leida && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
