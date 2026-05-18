"use client";

import type { Usuario } from "@/shared/types/app";
import { cn } from "@/shared/lib/cn";
import { PageHeader } from "./page-header";

type PageShellProps = {
  usuario: Usuario;
  children: React.ReactNode;
  titulo?: string;
  subtitulo?: string;
  ancho?: "estrecho" | "completo";
};

export function PageShell({
  usuario,
  children,
  titulo,
  subtitulo,
  ancho = "estrecho",
}: PageShellProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full flex-1 px-4 py-6 pb-16 sm:px-8 lg:px-10",
        ancho === "completo" ? "max-w-[72rem]" : "max-w-3xl",
      )}
    >
      <PageHeader usuario={usuario} titulo={titulo} subtitulo={subtitulo} />
      {children}
    </main>
  );
}
