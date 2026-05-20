"use client";

import { Building2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "./components/auth-shell";
import {
  EMPRESA_STORAGE_KEY,
  SESSION_STORAGE_KEY,
} from "@/features/shell/domain/empresa-context";
import { MOCK_EMPRESAS } from "@/shared/infrastructure/mock";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export function OnboardingView() {
  const router = useRouter();
  const [selected, setSelected] = useState(MOCK_EMPRESAS[0].id);

  function continuar() {
    localStorage.setItem(SESSION_STORAGE_KEY, "demo");
    localStorage.setItem(EMPRESA_STORAGE_KEY, selected);
    document.cookie = "pe:session=demo; path=/; max-age=86400; SameSite=Lax";
    router.push("/inicio");
  }

  return (
    <AuthShell paso={{ actual: 2, total: 2, label: "Empresa" }}>
      <Card padding="lg" className="shadow-card">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Elegí tu empresa
        </h1>
        <p className="mt-2 text-sm text-muted">
          Seleccioná con cuál querés operar en esta sesión demo.
        </p>

        <ul className="mt-6 space-y-2">
          {MOCK_EMPRESAS.map((empresa) => {
            const active = selected === empresa.id;
            return (
              <li key={empresa.id}>
                <button
                  type="button"
                  onClick={() => setSelected(empresa.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150",
                    active
                      ? "border-primary bg-primary-soft shadow-xs"
                      : "border-border-subtle hover:border-border-strong hover:bg-surface-muted/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                      active ? "bg-primary text-white" : "bg-surface-muted text-muted",
                    )}
                  >
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink">{empresa.nombre}</p>
                    <p className="text-xs text-faint">CUIT {empresa.cuit}</p>
                  </div>
                  {active && <Check className="h-5 w-5 shrink-0 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>

        <Button className="mt-6 w-full" onClick={continuar}>
          Continuar al dashboard
        </Button>
      </Card>
    </AuthShell>
  );
}
