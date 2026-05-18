"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PonchoLogo } from "@/features/shell/delivery/components/poncho-logo";
import { SESSION_STORAGE_KEY } from "@/features/shell/domain/empresa-context";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export function LoginView() {
  const router = useRouter();

  function entrar() {
    localStorage.setItem(SESSION_STORAGE_KEY, "demo");
    router.push("/onboarding");
  }

  function saltear() {
    router.push("/inicio");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-primary-soft/40 via-transparent to-accent-soft/50" />
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <PonchoLogo />
        </div>
        <Card padding="lg" className="border-primary/15 shadow-hover">
          <h1 className="font-poncho text-2xl font-semibold text-ink">
            Bienvenido a Poncho Empresas
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Demo interactiva para PYMES. Operá, cobrá y financiá desde un solo lugar.
          </p>
          <div className="mt-6 space-y-3">
            <Button className="w-full" onClick={entrar}>
              Ingresar a la demo
            </Button>
            <button
              type="button"
              onClick={saltear}
              className="w-full text-center text-sm text-muted underline-offset-2 hover:text-ink hover:underline"
            >
              Entrar sin login
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-faint">
            ¿Ya tenés cuenta?{" "}
            <Link href="/onboarding" className="text-primary hover:underline">
              Elegí tu empresa
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
