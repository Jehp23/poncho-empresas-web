import { CASHFLOW_PROYECCION } from "../../domain/mock";

type CashflowChartProps = {
  height?: "sm" | "md";
  className?: string;
};

export function CashflowChart({ height = "sm", className = "" }: CashflowChartProps) {
  const data = CASHFLOW_PROYECCION;
  const max = Math.max(...data.flatMap((d) => [d.ingresos, d.egresos]));
  const barHeight = height === "md" ? "h-40" : "h-32";

  return (
    <div className={className}>
      <div className={`overflow-x-auto ${barHeight}`}>
        <div className="flex h-full min-w-[520px] items-end gap-1">
          {data.map((row) => (
            <div key={row.mes} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="flex h-[calc(100%-20px)] w-full items-end justify-center gap-0.5">
                <div
                  className="w-[42%] max-w-3 rounded-t-sm bg-primary/80"
                  style={{
                    height: `${(row.ingresos / max) * 100}%`,
                    minHeight: 4,
                  }}
                />
                <div
                  className="w-[42%] max-w-3 rounded-t-sm bg-accent/70"
                  style={{
                    height: `${(row.egresos / max) * 100}%`,
                    minHeight: 4,
                  }}
                />
              </div>
              <span className="w-full truncate text-center text-[10px] text-faint">
                {row.mes}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-primary/80" /> Ingresos
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-accent/70" /> Egresos
        </span>
      </div>
    </div>
  );
}
