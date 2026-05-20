"use client";

import { CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";

type Paso = "upload" | "processing" | "done";

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
};

export function ImportarExtractoModal({ open, onClose, onComplete }: Props) {
  const [paso, setPaso] = useState<Paso>("upload");
  const [archivo, setArchivo] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setPaso("upload");
      setArchivo(null);
    }
  }, [open]);

  useEffect(() => {
    if (paso !== "processing") return;
    const t = setTimeout(() => {
      setPaso("done");
      onComplete?.();
    }, 2200);
    return () => clearTimeout(t);
  }, [paso, onComplete]);

  if (!open) return null;

  function iniciarImport(fileName: string) {
    setArchivo(fileName);
    setPaso("processing");
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg rounded-xl border border-border-subtle bg-surface p-6 shadow-hover"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Importar extracto
            </h2>
            <p className="mt-1 text-sm text-muted">
              Demo — PDF o CSV de cualquier banco
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {paso === "upload" && (
          <>
            <label
              className={cn(
                "flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-border-strong bg-bg px-6 py-8 text-center transition-colors",
                "hover:border-primary hover:bg-primary-soft/30",
              )}
            >
              <Upload className="h-8 w-8 text-muted" />
              <p className="mt-3 text-sm font-semibold text-ink">
                Arrastrá o seleccioná un archivo
              </p>
              <p className="mt-1 text-xs text-muted">PDF · CSV · hasta 10 MB</p>
              <input
                type="file"
                accept=".pdf,.csv"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) iniciarImport(file.name);
                }}
              />
            </label>
            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={() => iniciarImport("Galicia_Mayo2026.pdf")}
            >
              Usar archivo demo
            </Button>
          </>
        )}

        {paso === "processing" && (
          <div className="py-8 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 font-medium text-ink">Procesando {archivo}…</p>
            <p className="mt-2 text-sm text-muted">
              IA conciliando movimientos — demo
            </p>
          </div>
        )}

        {paso === "done" && (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <h3 className="font-display mt-4 text-lg font-semibold text-ink">
              Extracto importado
            </h3>
            <p className="mt-2 text-sm text-muted">
              {archivo} · 247 movimientos conciliados · 3 pendientes de revisión
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-surface-muted/60 px-4 py-3 text-left text-sm">
              <FileText className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted">
                Galicia quedó sincronizado. Revisá los pendientes abajo.
              </span>
            </div>
            <Button className="mt-6 w-full" onClick={onClose}>
              Listo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
