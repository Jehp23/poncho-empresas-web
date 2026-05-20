import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type PageHeaderRowProps = {
  titulo: string;
  subtitulo?: string;
  accion?: ReactNode;
  className?: string;
};

export function PageHeaderRow({
  titulo,
  subtitulo,
  accion,
  className,
}: PageHeaderRowProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-start justify-between gap-4",
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-ink">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="mt-1 text-sm text-muted">{subtitulo}</p>
        )}
      </div>
      {accion && <div className="shrink-0">{accion}</div>}
    </div>
  );
}
