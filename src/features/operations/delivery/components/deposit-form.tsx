"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary";

export function DepositForm() {
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <Card padding="lg" className="text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="mt-4 font-poncho text-lg font-semibold text-ink">
          Depósito registrado
        </h3>
        <p className="mt-2 text-sm text-muted">
          Mock demo — te enviamos el comprobante por email.
        </p>
        <Button variant="secondary" className="mt-5" onClick={() => setEnviado(false)}>
          Nuevo depósito
        </Button>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <h3 className="font-poncho text-lg font-semibold text-ink">Depositar</h3>
      <p className="mt-1 text-sm text-muted">
        Acreditá fondos en tu cuenta operativa vía transferencia bancaria.
      </p>
      <div className="mt-6 rounded-xl bg-surface-muted/80 p-4">
        <p className="text-label">CBU Poncho Empresas</p>
        <p className="mt-1 font-mono text-sm font-semibold text-ink">
          00701234-0123456789012345-6
        </p>
        <p className="mt-3 text-label">Alias</p>
        <p className="mt-1 text-sm font-semibold text-ink">PONCHO.TUEMPRESA</p>
      </div>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setEnviado(true);
        }}
      >
        <label className="block text-sm">
          <span className="text-muted">Monto depositado (ARS)</span>
          <input
            className={inputClass}
            type="number"
            min="1"
            placeholder="0,00"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Comprobante (opcional)</span>
          <input className={inputClass} type="file" accept=".pdf,.jpg,.png" />
        </label>
        <Button type="submit" className="w-full sm:w-auto">
          Registrar depósito
        </Button>
      </form>
    </Card>
  );
}
