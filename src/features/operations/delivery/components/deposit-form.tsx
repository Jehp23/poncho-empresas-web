"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { FormField, TextInput } from "@/shared/ui/form-field";
import { useUiFeedback } from "@/shared/ui/ui-feedback";

export function DepositForm() {
  const { toast } = useUiFeedback();
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <Card padding="lg" className="text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="font-display mt-4 text-lg font-semibold text-ink">
          Depósito registrado
        </h3>
        <p className="mt-2 text-sm text-muted">
          Demo — te enviamos el comprobante por email.
        </p>
        <Button variant="secondary" className="mt-5" onClick={() => setEnviado(false)}>
          Nuevo depósito
        </Button>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <h3 className="text-section-title">Depositar</h3>
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
        <Button
          type="button"
          variant="secondary"
          className="mt-3 h-8 px-3 text-xs"
          onClick={() => {
            navigator.clipboard?.writeText("PONCHO.TUEMPRESA");
            toast("Alias copiado al portapapeles", "info");
          }}
        >
          Copiar alias
        </Button>
      </div>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setEnviado(true);
          toast("Depósito registrado — demo", "success");
        }}
      >
        <FormField label="Monto depositado (ARS)">
          <TextInput type="number" min="1" placeholder="0,00" required />
        </FormField>
        <FormField label="Comprobante (opcional)">
          <TextInput type="file" accept=".pdf,.jpg,.png" />
        </FormField>
        <Button type="submit" className="w-full sm:w-auto">
          Registrar depósito
        </Button>
      </form>
    </Card>
  );
}
