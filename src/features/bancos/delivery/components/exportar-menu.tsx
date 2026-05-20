"use client";

import { ChevronDown, Download, FileSpreadsheet, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { useUiFeedback } from "@/shared/ui/ui-feedback";

const REPORTES = [
  {
    id: "resumen",
    label: "Resumen consolidado",
    detalle: "PDF · Snapshot del mes",
    formato: "PDF",
    icon: FileText,
  },
  {
    id: "movimientos",
    label: "Movimientos por banco",
    detalle: "Excel · Detalle operativo",
    formato: "Excel",
    icon: FileSpreadsheet,
  },
  {
    id: "flujo",
    label: "Flujo ingresos / egresos",
    detalle: "PDF · Para tesorería",
    formato: "PDF",
    icon: FileText,
  },
  {
    id: "conciliacion",
    label: "Pendientes de conciliar",
    detalle: "Excel · Para contador",
    formato: "Excel",
    icon: FileSpreadsheet,
  },
] as const;

export function ExportarMenu() {
  const { toast } = useUiFeedback();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function exportar(label: string) {
    setOpen(false);
    toast(`Preparando "${label}"… (demo)`, "info");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-3.5 py-2 text-[12px] font-semibold backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/20"
      >
        <Download className="h-3.5 w-3.5" />
        Exportar
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul className="absolute left-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-xl border border-white/20 bg-[#1a4f3e] py-1 shadow-lg">
          {REPORTES.map((r) => {
            const Icon = r.icon;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => exportar(r.label)}
                  className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/10"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">{r.label}</p>
                    <p className="text-[11px] text-white/55">{r.detalle}</p>
                  </div>
                  <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/70">
                    {r.formato}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
