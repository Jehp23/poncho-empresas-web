"use client";

import { Building2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PonchoLogo } from "@/features/shell/delivery/components/poncho-logo";
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
    router.push("/inicio");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-center">
          <PonchoLogo />
        </div>
        <Card padding="lg">
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
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                      active
                        ? "border-primary bg-primary-soft"
                        : "border-border-subtle hover:bg-surface-muted",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
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
      </div>
    </div>
  );
}
