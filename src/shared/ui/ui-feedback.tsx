"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button } from "./button";

type ToastVariant = "success" | "info" | "default";

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
};

type DrawerOptions = {
  title: string;
  subtitle?: string;
  content: ReactNode;
};

type UiFeedbackContextValue = {
  toast: (message: string, variant?: ToastVariant) => void;
  confirm: (options: ConfirmOptions) => void;
  openDrawer: (options: DrawerOptions) => void;
  closeDrawer: () => void;
};

const UiFeedbackContext = createContext<UiFeedbackContextValue | null>(null);

export function useUiFeedback() {
  const ctx = useContext(UiFeedbackContext);
  if (!ctx) {
    throw new Error("useUiFeedback debe usarse dentro de UiFeedbackProvider");
  }
  return ctx;
}

export function UiFeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmOptions | null>(null);
  const [drawer, setDrawer] = useState<(DrawerOptions & { open: boolean }) | null>(
    null,
  );

  const toast = useCallback((message: string, variant: ToastVariant = "default") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const confirm = useCallback((options: ConfirmOptions) => {
    setConfirmState(options);
  }, []);

  const openDrawer = useCallback((options: DrawerOptions) => {
    setDrawer({ ...options, open: true });
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawer((d) => (d ? { ...d, open: false } : null));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const last = toasts[toasts.length - 1];
    const t = setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== last.id));
    }, 3200);
    return () => clearTimeout(t);
  }, [toasts]);

  useEffect(() => {
    if (!drawer?.open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawer?.open, closeDrawer]);

  return (
    <UiFeedbackContext.Provider value={{ toast, confirm, openDrawer, closeDrawer }}>
      {children}

      {/* Toasts */}
      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[100] flex max-w-sm flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-2.5 rounded-xl border px-4 py-3 shadow-hover",
              t.variant === "success" && "border-success/30 bg-surface",
              t.variant === "info" && "border-info/30 bg-surface",
              t.variant === "default" && "border-border-subtle bg-surface",
            )}
          >
            {t.variant === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            ) : (
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            )}
            <p className="text-sm font-medium text-ink">{t.message}</p>
          </div>
        ))}
      </div>

      {/* Confirm */}
      {confirmState && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
            aria-label="Cerrar"
            onClick={() => setConfirmState(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-xl border border-border-subtle bg-surface p-6 shadow-hover"
          >
            <h2 className="font-display text-lg font-semibold text-ink">
              {confirmState.title}
            </h2>
            {confirmState.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {confirmState.description}
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <Button variant="secondary" onClick={() => setConfirmState(null)}>
                {confirmState.cancelLabel ?? "Cancelar"}
              </Button>
              <Button
                onClick={() => {
                  confirmState.onConfirm();
                  setConfirmState(null);
                }}
              >
                {confirmState.confirmLabel ?? "Confirmar"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}
      {drawer && (
        <>
          <button
            type="button"
            className={cn(
              "fixed inset-0 z-[80] bg-black/20 backdrop-blur-sm transition-opacity",
              drawer.open ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-label="Cerrar panel"
            onClick={closeDrawer}
          />
          <aside
            className={cn(
              "fixed right-0 top-0 z-[85] flex h-full w-full max-w-md flex-col border-l border-border-subtle bg-surface shadow-lg transition-transform duration-200",
              drawer.open ? "translate-x-0" : "translate-x-full",
            )}
            aria-hidden={!drawer.open}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-4">
              <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {drawer.title}
                </h2>
                {drawer.subtitle && (
                  <p className="mt-0.5 text-sm text-muted">{drawer.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-surface-muted"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">{drawer.content}</div>
          </aside>
        </>
      )}
    </UiFeedbackContext.Provider>
  );
}

/** Filas clave-valor para drawers de detalle */
export function DetailRow({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 py-2.5", className)}>
      <span className="text-sm text-muted">{label}</span>
      <span className="text-right text-sm font-medium text-ink">{value}</span>
    </div>
  );
}
