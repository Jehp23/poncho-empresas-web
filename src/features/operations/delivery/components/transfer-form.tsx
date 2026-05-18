"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Cuenta } from "@/shared/types/app";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { formatMonto } from "@/shared/lib/format";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary";

export function TransferForm({ cuentas }: { cuentas: Cuenta[] }) {
  const [enviado, setEnviado] = useState(false);
  const operativa = cuentas.find((c) => c.tipo === "operativa");

  if (enviado) {
    return (
      <Card padding="lg" className="text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="mt-4 font-poncho text-lg font-semibold text-ink">
          Transferencia programada
        </h3>
        <p className="mt-2 text-sm text-muted">
          Mock demo — la operación aparecerá en movimientos en unos segundos.
        </p>
        <Button variant="secondary" className="mt-5" onClick={() => setEnviado(false)}>
          Nueva transferencia
        </Button>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <h3 className="font-poncho text-lg font-semibold text-ink">Transferir</h3>
      <p className="mt-1 text-sm text-muted">
        Desde {operativa?.nombre ?? "cuenta operativa"}{" "}
        {operativa && `(${formatMonto(operativa.saldo)} disponible)`}
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setEnviado(true);
        }}
      >
        <label className="block text-sm">
          <span className="text-muted">Destinatario</span>
          <input className={inputClass} placeholder="CBU, alias o contacto" required />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Monto (ARS)</span>
          <input
            className={inputClass}
            type="number"
            min="1"
            placeholder="0,00"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Concepto</span>
          <input className={inputClass} placeholder="Ej. Pago proveedor" />
        </label>
        <Button type="submit" className="w-full sm:w-auto">
          Confirmar transferencia
        </Button>
      </form>
    </Card>
  );
}
