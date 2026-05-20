"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { AuthShell } from "./components/auth-shell";
import { startDemoSession } from "@/features/auth/domain/start-demo-session";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export function LoginView() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirect = searchParams.get("redirect");
  const destinoInicio =
    redirect && redirect.startsWith("/") && !redirect.startsWith("/login")
      ? redirect
      : "/inicio";

  async function entrar() {
    setLoading(true);
    setError(null);
    try {
      await startDemoSession("/onboarding");
    } catch {
      setError("No se pudo iniciar sesión. Intentá de nuevo.");
      setLoading(false);
    }
  }

  async function saltear() {
    setLoading(true);
    setError(null);
    try {
      await startDemoSession(destinoInicio);
    } catch {
      setError("No se pudo iniciar sesión. Intentá de nuevo.");
      setLoading(false);
    }
  }

  return (
    <AuthShell paso={{ actual: 1, total: 2, label: "Acceso" }}>
      <Card padding="lg" className="shadow-card">
        <Badge variant="ai" className="mb-4">
          Demo interactiva
        </Badge>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Bienvenido a Poncho Empresas
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Explorá la plataforma con datos de ejemplo. Sin registro ni tarjeta.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-3">
          <Button className="w-full" onClick={entrar} disabled={loading}>
            {loading ? "Ingresando…" : "Ingresar a la demo"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
          <button
            type="button"
            onClick={saltear}
            disabled={loading}
            className="w-full text-center text-sm text-muted underline-offset-2 transition-colors hover:text-ink hover:underline disabled:opacity-50"
          >
            Entrar sin onboarding
          </button>
        </div>

        <div className="mt-6 space-y-2 rounded-xl bg-surface-muted/70 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
            Entorno seguro de demostración
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-ai" />
            Datos mock · sin conexión bancaria real
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-faint">
          ¿Ya tenés cuenta?{" "}
          <Link href="/onboarding" className="font-medium text-primary hover:underline">
            Elegí tu empresa
          </Link>
        </p>
      </Card>
    </AuthShell>
  );
}
