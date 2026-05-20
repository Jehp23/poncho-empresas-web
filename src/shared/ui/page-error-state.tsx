"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

type PageErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function PageErrorState({
  title = "Algo salió mal",
  description = "No pudimos cargar esta pantalla. Probá de nuevo en unos segundos.",
  onRetry,
}: PageErrorStateProps) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6 py-12">
      <Card padding="lg" className="max-w-md w-full text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-danger" />
        <h2 className="font-display mt-4 text-xl font-semibold text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        {onRetry && (
          <Button className="mt-6" onClick={onRetry}>
            <RefreshCw className="h-4 w-4" />
            Reintentar
          </Button>
        )}
      </Card>
    </div>
  );
}
