import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type PageShellProps = {
  children: ReactNode;
  /** Preferir PageHeaderRow dentro de children para páneas dashboard/lista */
  titulo?: string;
  subtitulo?: string;
  ancho?: "estrecho" | "completo";
};

export function PageShell({
  children,
  titulo,
  subtitulo,
  ancho = "estrecho",
}: PageShellProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full flex-1 px-6 py-7 pb-24 lg:px-10 lg:pb-16",
        ancho === "completo" ? "max-w-[76rem]" : "max-w-3xl",
      )}
    >
      {(titulo || subtitulo) && (
        <div className="mb-6">
          {titulo && (
            <h1 className="font-display text-[22px] font-semibold tracking-tight text-ink">
              {titulo}
            </h1>
          )}
          {subtitulo && (
            <p className="mt-1 text-sm text-muted">{subtitulo}</p>
          )}
        </div>
      )}
      {children}
    </main>
  );
}
