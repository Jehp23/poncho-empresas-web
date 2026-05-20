"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Cuenta } from "@/shared/types/app";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { FormField, TextInput } from "@/shared/ui/form-field";
import { useUiFeedback } from "@/shared/ui/ui-feedback";
import { formatMonto } from "@/shared/lib/format";

export function TransferForm({ cuentas }: { cuentas: Cuenta[] }) {
  const { confirm, toast } = useUiFeedback();
  const [enviado, setEnviado] = useState(false);
  const operativa = cuentas.find((c) => c.tipo === "operativa");

  function solicitarTransferencia() {
    confirm({
      title: "Confirmar transferencia",
      description:
        "Demo — la operación se simula y aparecerá en movimientos. No se envía dinero real.",
      confirmLabel: "Transferir",
      onConfirm: () => {
        setEnviado(true);
        toast("Transferencia programada correctamente", "success");
      },
    });
  }

  if (enviado) {
    return (
      <Card padding="lg" className="text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="font-display mt-4 text-lg font-semibold text-ink">
          Transferencia programada
        </h3>
        <p className="mt-2 text-sm text-muted">
          Demo — la operación aparecerá en movimientos en unos segundos.
        </p>
        <Button variant="secondary" className="mt-5" onClick={() => setEnviado(false)}>
          Nueva transferencia
        </Button>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <h3 className="text-section-title">Transferir</h3>
      <p className="mt-1 text-sm text-muted">
        Desde {operativa?.nombre ?? "cuenta operativa"}
        {operativa && ` · ${formatMonto(operativa.saldo)} disponible`}
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          solicitarTransferencia();
        }}
      >
        <FormField label="Destinatario">
          <TextInput placeholder="CBU, alias o contacto" required />
        </FormField>
        <FormField label="Monto (ARS)">
          <TextInput type="number" min="1" placeholder="0,00" required />
        </FormField>
        <FormField label="Concepto">
          <TextInput placeholder="Ej. Pago proveedor" />
        </FormField>
        <Button type="submit" className="w-full sm:w-auto">
          Transferir
        </Button>
      </form>
    </Card>
  );
}
