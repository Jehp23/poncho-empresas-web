"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { FormField, TextInput } from "@/shared/ui/form-field";
import { useUiFeedback } from "@/shared/ui/ui-feedback";
import { formatMonto } from "@/shared/lib/format";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function EmitirEcheqModal({ open, onClose }: Props) {
  const { confirm, toast } = useUiFeedback();
  const [beneficiario, setBeneficiario] = useState("");
  const [cuit, setCuit] = useState("");
  const [monto, setMonto] = useState("");
  const [vencimiento, setVencimiento] = useState("7");

  useEffect(() => {
    if (!open) {
      setBeneficiario("");
      setCuit("");
      setMonto("");
      setVencimiento("7");
    }
  }, [open]);

  if (!open) return null;

  const montoNum = Number(monto) || 0;
  const valid = beneficiario.trim() && cuit.trim() && montoNum > 0;

  function emitir() {
    if (!valid) return;
    confirm({
      title: "Confirmar emisión",
      description: `Demo — eCheq por ${formatMonto(montoNum)} a ${beneficiario} con vencimiento a ${vencimiento} días.`,
      confirmLabel: "Emitir eCheq",
      onConfirm: () => {
        toast("eCheq emitido correctamente — demo", "success");
        onClose();
      },
    });
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-xl border border-border-subtle bg-surface p-6 shadow-hover"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Emitir eCheq
            </h2>
            <p className="mt-1 text-sm text-muted">Demo — sin envío real al banco</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            emitir();
          }}
        >
          <FormField label="Beneficiario">
            <TextInput
              value={beneficiario}
              onChange={(e) => setBeneficiario(e.target.value)}
              placeholder="Razón social"
              required
            />
          </FormField>
          <FormField label="CUIT">
            <TextInput
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              placeholder="30-12345678-9"
              required
            />
          </FormField>
          <FormField label="Monto (ARS)">
            <TextInput
              type="number"
              min="1"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="0,00"
              required
            />
          </FormField>
          <FormField label="Vencimiento">
            <select
              value={vencimiento}
              onChange={(e) => setVencimiento(e.target.value)}
              className="h-10 w-full rounded-lg border border-border-subtle bg-surface px-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="7">7 días</option>
              <option value="15">15 días</option>
              <option value="30">30 días</option>
              <option value="60">60 días</option>
            </select>
          </FormField>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={!valid}>
              Emitir
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
