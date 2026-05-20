"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { FinancingCard } from "@/features/home/delivery/components/financing-card";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { FinanciamientoHero } from "./components/financiamiento-hero";
import { SolicitudTimeline } from "./components/solicitud-timeline";
import {
  isStepValid,
  WIZARD_PASOS_TOTAL,
  WIZARD_STEP_TITLES,
  type WizardDraft,
} from "../domain/wizard-schema";
import { loadWizardDraft, saveWizardDraft } from "../domain/wizard-storage";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { FilterChips } from "@/shared/ui/filter-chips";
import { KpiCard } from "@/shared/ui/kpi-card";
import { TabBar } from "@/shared/ui/tab-bar";
import { Stepper } from "@/shared/ui/stepper";
import { formatMonto } from "@/shared/lib/format";

import { FormField, INPUT_CLASS, TextArea, TextInput } from "@/shared/ui/form-field";
import { DashboardLoading } from "@/features/shell/delivery/components/dashboard-loading";
import { DetailRow, useUiFeedback } from "@/shared/ui/ui-feedback";

const FIN_TABS = [
  { id: "carpeta", label: "Carpeta Financiera" },
  { id: "linea", label: "Mi Línea" },
  { id: "cheques", label: "Cheques Financiados" },
] as const;

const CHEQUE_FILTROS = [
  { id: "todos", label: "Todos" },
  { id: "pendientes", label: "Pendientes" },
  { id: "acreditados", label: "Acreditados" },
  { id: "vencidos", label: "Vencidos" },
] as const;

type FinTabId = (typeof FIN_TABS)[number]["id"];

const MOCK_CHEQUES_FIN = [
  {
    id: "cf1",
    numero: "#00123456",
    contraparte: "Distribuidora Centro",
    monto: 1_800_000,
    vence: "15 jun",
    estado: "en_revision" as const,
  },
  {
    id: "cf2",
    numero: "#00121890",
    contraparte: "Supermercados Rey SA",
    monto: 2_400_000,
    vence: "30 may",
    estado: "acreditado" as const,
  },
];

type WizardViewProps = {
  paso: number;
};

export function WizardView({ paso }: WizardViewProps) {
  const { empresaId, data } = useEmpresa();
  const { toast } = useUiFeedback();
  const router = useRouter();
  const [draft, setDraft] = useState<WizardDraft | null>(null);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    setDraft(loadWizardDraft(empresaId));
  }, [empresaId]);

  if (!draft) return <DashboardLoading />;

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
      toast("Solicitud enviada — carpeta en revisión", "success");
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
      <PageShell titulo="Solicitud enviada" subtitulo="Tu carpeta está en revisión." ancho="estrecho">
        <Card padding="lg" className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
          <h2 className="font-display mt-4 text-xl font-semibold text-ink">
            Carpeta en revisión
          </h2>
          <p className="mt-2 text-sm text-muted">
            Un asesor Poncho revisará tu solicitud en 48–72 hs hábiles.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/financiamiento">
              <Button>Ver estado de solicitud</Button>
            </Link>
            <Link href="/inicio">
              <Button variant="secondary">Volver al inicio</Button>
            </Link>
          </div>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      titulo="Solicitud de financiamiento"
      subtitulo={WIZARD_STEP_TITLES[paso]}
      ancho="estrecho"
    >
      <Stepper pasoActual={paso} pasosTotal={WIZARD_PASOS_TOTAL} className="mb-6" />

      <Card padding="lg">
        {paso === 1 && (
          <div className="space-y-4">
            <FormField label="Reseña de la empresa">
              <TextArea
                value={draft.paso1?.reseña ?? ""}
                onChange={(e) =>
                  updateDraft({ paso1: { ...draft.paso1, reseña: e.target.value, sector: draft.paso1?.sector ?? "" } })
                }
                placeholder="¿A qué se dedica tu PYME?"
              />
            </FormField>
            <FormField label="Sector">
              <TextInput
                value={draft.paso1?.sector ?? ""}
                onChange={(e) =>
                  updateDraft({ paso1: { reseña: draft.paso1?.reseña ?? "", sector: e.target.value } })
                }
                placeholder="Ej. Tecnología, distribución"
              />
            </FormField>
          </div>
        )}

        {paso === 2 && (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="text-muted">Razón social</span>
              <input
                className={INPUT_CLASS}
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
                className={INPUT_CLASS}
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
                className={INPUT_CLASS}
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
                className={INPUT_CLASS}
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
                className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={`${INPUT_CLASS} min-h-[80px]`}
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
                className={INPUT_CLASS}
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
                className={INPUT_CLASS}
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
                className={INPUT_CLASS}
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

function CarpetaTab({ data }: { data: ReturnType<typeof useEmpresa>["data"] }) {
  const { empresaId } = useEmpresa();
  const [draft, setDraft] = useState<WizardDraft | null>(null);

  useEffect(() => {
    setDraft(loadWizardDraft(empresaId));
  }, [empresaId]);

  if (draft?.estado === "en_revision") {
    return <SolicitudTimeline draft={draft} />;
  }

  const paso = data.financiamiento.pasoActual ?? draft?.pasoActual ?? 1;
  const progress =
    data.financiamiento.pasoActual != null
      ? Math.round((data.financiamiento.pasoActual / data.financiamiento.pasosTotal) * 100)
      : 0;
  const wizardHref =
    data.financiamiento.estado === "no_iniciado"
      ? "/financiamiento/solicitud/1"
      : `/financiamiento/solicitud/${paso}`;

  return (
    <div className="space-y-6">
      <Card padding="md" className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-primary-soft font-display text-sm font-bold text-primary">
            {paso}/{data.financiamiento.pasosTotal}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Carpeta en progreso</p>
            <p className="text-xs text-muted">Guardado automático activo</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="ai">Asistido por IA</Badge>
          <Badge variant="warning">En progreso</Badge>
        </div>
      </Card>

      <FinancingCard data={data.financiamiento} />

      <div className="text-center">
        <Link href={wizardHref}>
          <Button>Continuar carpeta — {progress}% completado</Button>
        </Link>
      </div>
    </div>
  );
}

function LineaTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Monto avalado total"
          value={formatMonto(30_000_000)}
          change="SGR Garantías"
          changeColor="muted"
          accentColor="var(--pe-primary)"
        />
        <KpiCard
          label="Monto utilizado"
          value={formatMonto(18_600_000)}
          change="62% del total"
          changeColor="warning"
          accentColor="var(--pe-warning)"
        />
        <KpiCard
          label="Disponible"
          value={formatMonto(11_400_000)}
          change="38% libre"
          changeColor="success"
          accentColor="var(--pe-success-vivid)"
        />
        <KpiCard
          label="Próximos vencimientos"
          value={formatMonto(3_200_000)}
          change="Esta semana"
          changeColor="danger"
          accentColor="var(--pe-danger)"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card padding="lg">
          <p className="text-section-title mb-4">Utilización de la línea</p>
          <div className="mb-2 flex items-center justify-between text-sm font-semibold">
            <span>{formatMonto(18_600_000)} / {formatMonto(30_000_000)}</span>
            <Badge variant="warning">62%</Badge>
          </div>
          <div className="progress-track h-2.5">
            <div className="progress-fill bg-warning" style={{ width: "62%" }} />
          </div>
          <p className="mt-4 text-xs text-muted">
            Límite recomendado: 80% · Vencimiento línea: 15 sep 2026
          </p>
        </Card>

        <Card padding="lg">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-section-title">Condiciones de la línea</p>
            <Badge variant="success-vivid">Vigente</Badge>
          </div>
          <dl className="space-y-3 text-sm">
            {[
              ["Tipo", "SGR / CPD"],
              ["Tasa vigente", "TNA 85%"],
              ["Plazo máximo", "360 días"],
              ["Garantía", "SGR Garantías SA"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between rounded-lg bg-surface-muted/60 px-3 py-2.5"
              >
                <dt className="text-muted">{label}</dt>
                <dd className="font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </div>
  );
}

function ChequesTab() {
  const { toast, openDrawer } = useUiFeedback();
  const [filtro, setFiltro] = useState<(typeof CHEQUE_FILTROS)[number]["id"]>("todos");

  function verDetalle(item: (typeof MOCK_CHEQUES_FIN)[number]) {
    openDrawer({
      title: item.numero,
      subtitle: item.contraparte,
      content: (
        <div className="divide-y divide-border-subtle">
          <DetailRow label="Contraparte" value={item.contraparte} />
          <DetailRow label="Monto" value={formatMonto(item.monto)} />
          <DetailRow label="Vencimiento" value={item.vence} />
          <DetailRow
            label="Estado"
            value={
              <Badge variant={item.estado === "acreditado" ? "success-vivid" : "warning"}>
                {item.estado === "acreditado" ? "Acreditado" : "En revisión"}
              </Badge>
            }
          />
          <p className="pt-4 text-xs text-faint">Demo — cheque financiado vía SGR.</p>
        </div>
      ),
    });
  }

  return (
    <div className="space-y-4">
      <FilterChips items={CHEQUE_FILTROS} active={filtro} onChange={setFiltro} />

      <Card padding="none" className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-subtle bg-surface-muted/50">
              {["N° ECHEQ", "Contraparte", "Monto", "Vencimiento", "Estado", "Acciones"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {MOCK_CHEQUES_FIN.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border-subtle last:border-0 hover:bg-surface-muted/30"
              >
                <td className="px-5 py-4 font-display font-semibold">{item.numero}</td>
                <td className="px-5 py-4">{item.contraparte}</td>
                <td className="px-5 py-4 font-display font-bold text-success">
                  {formatMonto(item.monto)}
                </td>
                <td className="px-5 py-4 text-muted">{item.vence}</td>
                <td className="px-5 py-4">
                  <Badge variant={item.estado === "acreditado" ? "success-vivid" : "warning"}>
                    {item.estado === "acreditado" ? "Acreditado" : "En revisión"}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      className="h-8 px-3 text-xs"
                      onClick={() => verDetalle(item)}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-8 px-3 text-xs"
                      onClick={() =>
                        toast(`Descargando pagaré ${item.numero} — demo`, "info")
                      }
                    >
                      Pagaré
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function FinanciamientoView() {
  const { data } = useEmpresa();
  const [tab, setTab] = useState<FinTabId>("carpeta");

  const paso = data.financiamiento.pasoActual ?? 1;
  const wizardHref =
    data.financiamiento.estado === "no_iniciado"
      ? "/financiamiento/solicitud/1"
      : `/financiamiento/solicitud/${paso}`;

  return (
    <PageShell ancho="completo">
      <FinanciamientoHero data={data.financiamiento} wizardHref={wizardHref} />

      <div className="mb-6">
        <TabBar tabs={FIN_TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "carpeta" && <CarpetaTab data={data} />}
      {tab === "linea" && <LineaTab />}
      {tab === "cheques" && <ChequesTab />}
    </PageShell>
  );
}
