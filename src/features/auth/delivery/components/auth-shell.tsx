import type { ReactNode } from "react";
import { PonchoLogo } from "@/features/shell/delivery/components/poncho-logo";

type AuthShellProps = {
  children: ReactNode;
  paso?: { actual: number; total: number; label: string };
};

const VALUE_PROPS = [
  "Consolidá bancos y billeteras en un solo lugar",
  "Operá con eCheqs, transferencias y FCI",
  "Accedé a financiamiento vía SGR",
];

export function AuthShell({ children, paso }: AuthShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* Panel de marca */}
      <aside className="gradient-primary relative hidden w-[44%] max-w-xl flex-col justify-between overflow-hidden p-10 text-white lg:flex xl:max-w-2xl">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute bottom-[-80px] left-[-40px] h-56 w-56 rounded-full bg-white/[0.03]" />

        <div className="relative z-10">
          <PonchoLogo className="[&_span]:text-white [&_span_span]:text-accent" />
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/60">
              Plataforma financiera B2B
            </p>
            <h1 className="font-display mt-3 text-3xl font-bold leading-tight tracking-tight">
              Operá, cobrá y financiá tu PYME
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              Todo lo que necesitás para la tesorería de tu empresa, en un solo lugar.
            </p>
          </div>

          <ul className="space-y-3">
            {VALUE_PROPS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-white/85 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/50">
          © {new Date().getFullYear()} Poncho Capital
        </p>
      </aside>

      {/* Formulario */}
      <main className="flex flex-1 flex-col items-center justify-center bg-bg px-4 py-10 sm:px-8">
        <div className="mb-8 flex justify-center lg:hidden">
          <PonchoLogo />
        </div>

        {paso && (
          <p className="mb-4 text-center text-xs font-medium text-muted">
            Paso {paso.actual} de {paso.total} · {paso.label}
          </p>
        )}

        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
