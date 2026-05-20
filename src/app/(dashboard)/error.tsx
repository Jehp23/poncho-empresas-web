"use client";

import { useEffect } from "react";
import { PageErrorState } from "@/shared/ui/page-error-state";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageErrorState
      title="Error al cargar"
      description="Ocurrió un problema inesperado. Podés reintentar o volver al inicio."
      onRetry={reset}
    />
  );
}
