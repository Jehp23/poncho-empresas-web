import { cn } from "@/shared/lib/cn";

type StepperProps = {
  pasoActual: number;
  pasosTotal: number;
  className?: string;
};

export function Stepper({ pasoActual, pasosTotal, className }: StepperProps) {
  const progress = Math.round((pasoActual / pasosTotal) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          Paso {pasoActual} de {pasosTotal}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
