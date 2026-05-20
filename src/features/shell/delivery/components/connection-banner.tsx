"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/ui/button";

type ConnectionBannerProps = {
  message?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
};

export function ConnectionBanner({
  message = "No pudimos conectar con el servidor. Mostrando datos de demostración.",
  onRetry,
  onDismiss,
}: ConnectionBannerProps) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 border-b border-warning/30 bg-warning-soft px-4 py-2.5 text-sm lg:px-6"
    >
      <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
      <p className="min-w-0 flex-1 text-ink">{message}</p>
      <div className="flex shrink-0 gap-2">
        {onRetry && (
          <Button variant="secondary" className="h-8 px-3 text-xs" onClick={onRetry}>
            <RefreshCw className="h-3.5 w-3.5" />
            Reintentar
          </Button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-xs font-semibold text-muted hover:text-ink"
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
}
