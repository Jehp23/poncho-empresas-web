"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { FinancingCard } from "@/features/home/delivery/components/financing-card";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import {
  isStepValid,
  WIZARD_PASOS_TOTAL,
  WIZARD_STEP_TITLES,
  type WizardDraft,
} from "../domain/wizard-schema";
import { loadWizardDraft, saveWizardDraft } from "../domain/wizard-storage";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Stepper } from "@/shared/ui/stepper";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary";

type WizardViewProps = {
  paso: number;
};

export function WizardView({ paso }: WizardViewProps) {
  const { empresaId, data } = useEmpresa();
  const router = useRouter();
  const [draft, setDraft] = useState<WizardDraft | null>(null);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    setDraft(loadWizardDraft(empresaId));
  }, [empresaId]);

  if (!draft) return null;

  const valid = isStepValid(paso, draft);

  function updateDraft(patch: Partial<WizardDraft>) {
    const next = { ...draft!, ...patch, pasoActual: paso };
    setDraft(next);
    saveWizardDraft(next);
  }

  function continuar() {
    if (!valid) return;
    if (paso >= WIZARD_PASOS_TOTAL) {
      const final: WizardDraft = {
        ...draft!,
        pasoActual: WIZARD_PASOS_TOTAL,
        estado: "en_revision",
      };
      saveWizardDraft(final);
      setEnviado(true);
      return;
    }
    router.push(`/financiamiento/solicitud/${paso + 1}`);
  }

  function volver() {
    if (paso <= 1) {
      router.push("/financiamiento");
      return;
    }
    router.push(`/financiamiento/solicitud/${paso - 1}`);
  }

  if (enviado) {
    return (
      <PageShell
        usuario={data.usuario}
        titulo="Solicitud enviada"
        subtitulo="Tu carpeta está en revisión."
        ancho="estrecho"
      >
        <Card padding="lg" className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
          <h2 className="font-poncho mt-4 text-xl font-semibold text-ink">
            Carpeta en revisión
          </h2>
          <p className="mt-2 text-sm text-muted">
            Un asesor Poncho revisará tu solicitud en 48–72 hs hábiles.
          </p>
          <Link href="/inicio">
            <Button className="mt-6">Volver al inicio</Button>
          </Link>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      usuario={data.usuario}
      titulo="Solicitud de financiamiento"
      subtitulo={WIZARD_STEP_TITLES[paso]}
      ancho="estrecho"
    >
      <Stepper pasoActual={paso} pasosTotal={WIZARD_PASOS_TOTAL} className="mb-6" />

      <Card padding="lg">
        {paso === 1 && (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="text-muted">Reseña de la empresa</span>
              <textarea
                className={`${inputClass} min-h-[100px] resize-y`}
                value={draft.paso1?.reseña ?? ""}
                onChange={(e) =>
                  updateDraft({ paso1: { ...draft.paso1, reseña: e.target.value, sector: draft.paso1?.sector ?? "" } })
                }
                placeholder="¿A qué se dedica tu PYME?"
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">Sector</span>
              <input
                className={inputClass}
                value={draft.paso1?.sector ?? ""}
                onChange={(e) =>
                  updateDraft({ paso1: { reseña: draft.paso1?.reseña ?? "", sector: e.target.value } })
                }
                placeholder="Ej. Tecnología, distribución"
              />
            </label>
          </div>
        )}

        {paso === 2 && (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="text-muted">Razón social</span>
              <input
                className={inputClass}
                value={draft.paso2?.razonSocial ?? data.empresa.nombre}
                onChange={(e) =>
                  updateDraft({
                    paso2: {
                      razonSocial: e.target.value,
                      cuit: draft.paso2?.cuit ?? data.empresa.cuit,
                      domicilio: draft.paso2?.domicilio ?? "",
                    },
                  })
                }
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">CUIT</span>
              <input
                className={inputClass}
                value={draft.paso2?.cuit ?? data.empresa.cuit}
                onChange={(e) =>
                  updateDraft({
                    paso2: {
                      razonSocial: draft.paso2?.razonSocial ?? "",
                      cuit: e.target.value,
                      domicilio: draft.paso2?.domicilio ?? "",
                    },
                  })
                }
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">Domicilio fiscal</span>
              <input
                className={inputClass}
                value={draft.paso2?.domicilio ?? ""}
                onChange={(e) =>
                  updateDraft({
                    paso2: {
                      razonSocial: draft.paso2?.razonSocial ?? "",
                      cuit: draft.paso2?.cuit ?? "",
                      domicilio: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
        )}

        {paso === 3 && (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="text-muted">Ingresos anuales (ARS)</span>
              <input
                className={inputClass}
                value={draft.paso3?.ingresosAnuales ?? ""}
                onChange={(e) =>
                  updateDraft({
                    paso3: { ingresosAnuales: e.target.value, ebitda: draft.paso3?.ebitda ?? "" },
                  })
                }
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">EBITDA anual (ARS)</span>
              <input
                className={inputClass}
                value={draft.paso3?.ebitda ?? ""}
                onChange={(e) =>
                  updateDraft({
                    paso3: { ingresosAnuales: draft.paso3?.ingresosAnuales ?? "", ebitda: e.target.value },
                  })
                }
              />
            </label>
          </div>
        )}

        {paso === 4 && (
          <label className="block text-sm">
            <span className="text-muted">Flujo de caja mensual promedio (ARS)</span>
            <input
              className={inputClass}
              value={draft.paso4?.flujoMensual ?? ""}
              onChange={(e) =>
                updateDraft({
                  paso4: { flujoMensual: e.target.value, estacionalidad: draft.paso4?.estacionalidad ?? "" },
                })
              }
            />
          </label>
        )}

        {paso === 5 && (
          <label className="block text-sm">
            <span className="text-muted">Deuda total vigente (ARS)</span>
            <input
              className={inputClass}
              value={draft.paso5?.deudaTotal ?? ""}
              onChange={(e) =>
                updateDraft({
                  paso5: { deudaTotal: e.target.value, bancoPrincipal: draft.paso5?.bancoPrincipal ?? "" },
                })
              }
            />
          </label>
        )}

        {paso === 6 && (
          <label className="block text-sm">
            <span className="text-muted">Tipo de garantía ofrecida</span>
            <select
              className={inputClass}
              value={draft.paso6?.tipoGarantia ?? ""}
              onChange={(e) =>
                updateDraft({
                  paso6: { tipoGarantia: e.target.value, descripcion: draft.paso6?.descripcion ?? "" },
                })
              }
            >
              <option value="">Seleccionar…</option>
              <option value="sgr">Aval SGR</option>
              <option value="hipoteca">Hipoteca</option>
              <option value="prenda">Prenda</option>
              <option value="ninguna">Sin garantía real</option>
            </select>
          </label>
        )}

        {paso === 7 && (
          <div className="space-y-4">
            <p className="text-sm text-muted">
              Subí balance, EERR y DDJJ (mock — solo se guarda el nombre).
            </p>
            <input
              type="file"
              className={inputClass}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  updateDraft({
                    paso7: { archivos: [...(draft.paso7?.archivos ?? []), file.name] },
                  });
                }
              }}
            />
            {draft.paso7?.archivos?.length ? (
              <ul className="text-sm text-muted">
                {draft.paso7.archivos.map((a) => (
                  <li key={a}>✓ {a}</li>
                ))}
              </ul>
            ) : null}
          </div>
        )}

        {paso === 8 && (
          <label className="block text-sm">
            <span className="text-muted">Socios y participación (%)</span>
            <textarea
              className={`${inputClass} min-h-[80px]`}
              value={draft.paso8?.socios ?? ""}
              onChange={(e) => updateDraft({ paso8: { socios: e.target.value } })}
              placeholder="Nombre — 60%, Nombre — 40%"
            />
          </label>
        )}

        {paso === 9 && (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="text-muted">Monto solicitado (ARS)</span>
              <input
                className={inputClass}
                value={draft.paso9?.montoSolicitado ?? ""}
                onChange={(e) =>
                  updateDraft({
                    paso9: {
                      montoSolicitado: e.target.value,
                      plazo: draft.paso9?.plazo ?? "",
                      destino: draft.paso9?.destino ?? "",
                    },
                  })
                }
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">Plazo (meses)</span>
              <input
                className={inputClass}
                value={draft.paso9?.plazo ?? ""}
                onChange={(e) =>
                  updateDraft({
                    paso9: {
                      montoSolicitado: draft.paso9?.montoSolicitado ?? "",
                      plazo: e.target.value,
                      destino: draft.paso9?.destino ?? "",
                    },
                  })
                }
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted">Destino de fondos</span>
              <input
                className={inputClass}
                value={draft.paso9?.destino ?? ""}
                onChange={(e) =>
                  updateDraft({
                    paso9: {
                      montoSolicitado: draft.paso9?.montoSolicitado ?? "",
                      plazo: draft.paso9?.plazo ?? "",
                      destino: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
        )}

        {paso === 10 && (
          <div className="space-y-3 text-sm text-muted">
            <p>Revisá los datos antes de enviar tu carpeta a Poncho Capital.</p>
            <ul className="space-y-1 rounded-xl bg-surface-muted/60 p-4">
              <li>Sector: {draft.paso1?.sector || "—"}</li>
              <li>Ingresos: {draft.paso3?.ingresosAnuales || "—"}</li>
              <li>Monto solicitado: {draft.paso9?.montoSolicitado || "—"}</li>
              <li>Documentos: {draft.paso7?.archivos?.length ?? 0} archivo(s)</li>
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={volver}>
            <ChevronLeft className="h-4 w-4" />
            {paso === 1 ? "Cancelar" : "Anterior"}
          </Button>
          <Button onClick={continuar} disabled={!valid}>
            {paso === WIZARD_PASOS_TOTAL ? "Enviar solicitud" : "Continuar"}
          </Button>
        </div>
      </Card>
    </PageShell>
  );
}

export function FinanciamientoView() {
  const { data } = useEmpresa();

  return (
    <PageShell usuario={data.usuario} ancho="estrecho">
      <div className="space-y-6">
        <Card padding="lg">
          <p className="text-label">Línea de crédito</p>
          <h2 className="font-poncho mt-2 text-xl font-semibold text-ink">
            Pre-calificación vía SGR
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Completá tu carpeta financiera en 10 pasos para acceder a líneas de
            financiamiento.
          </p>
          <Link href="/financiamiento/solicitud/1">
            <Button className="mt-5">Iniciar solicitud</Button>
          </Link>
        </Card>
        <FinancingCard data={data.financiamiento} />
      </div>
    </PageShell>
  );
}
