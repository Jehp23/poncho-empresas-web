"use client";

import { useDashboardData } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { PlaceholderMessage } from "@/features/shell/delivery/components/placeholder-message";

export function PlaceholderPageView({
  titulo,
  descripcion,
}: {
  titulo: string;
  descripcion: string;
}) {
  const data = useDashboardData();

  return (
    <PageShell usuario={data.usuario} titulo={titulo} subtitulo={descripcion}>
      <PlaceholderMessage titulo={titulo} descripcion={descripcion} />
    </PageShell>
  );
}
