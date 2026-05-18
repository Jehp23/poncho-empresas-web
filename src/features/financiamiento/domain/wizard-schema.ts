import type { EstadoFinanciamiento } from "@/shared/types/app";

export const WIZARD_PASOS_TOTAL = 10;

export const WIZARD_STEP_TITLES: Record<number, string> = {
  1: "Reseña de la empresa",
  2: "Datos fiscales",
  3: "Estados financieros",
  4: "Flujo de caja",
  5: "Deuda vigente",
  6: "Garantías",
  7: "Documentación",
  8: "Socios y accionistas",
  9: "Proyección",
  10: "Revisión y envío",
};

export interface WizardDraft {
  empresaId: string;
  pasoActual: number;
  updatedAt: string;
  estado: EstadoFinanciamiento;
  paso1?: { reseña: string; sector: string };
  paso2?: { razonSocial: string; cuit: string; domicilio: string };
  paso3?: { ingresosAnuales: string; ebitda: string };
  paso4?: { flujoMensual: string; estacionalidad: string };
  paso5?: { deudaTotal: string; bancoPrincipal: string };
  paso6?: { tipoGarantia: string; descripcion: string };
  paso7?: { archivos: string[] };
  paso8?: { socios: string };
  paso9?: { montoSolicitado: string; plazo: string; destino: string };
}

export function createEmptyDraft(empresaId: string): WizardDraft {
  return {
    empresaId,
    pasoActual: 1,
    updatedAt: new Date().toISOString(),
    estado: "en_progreso",
  };
}

export function isStepValid(paso: number, draft: WizardDraft): boolean {
  switch (paso) {
    case 1:
      return Boolean(draft.paso1?.reseña?.trim() && draft.paso1?.sector?.trim());
    case 2:
      return Boolean(
        draft.paso2?.razonSocial?.trim() &&
          draft.paso2?.cuit?.trim() &&
          draft.paso2?.domicilio?.trim(),
      );
    case 3:
      return Boolean(draft.paso3?.ingresosAnuales?.trim() && draft.paso3?.ebitda?.trim());
    case 4:
      return Boolean(draft.paso4?.flujoMensual?.trim());
    case 5:
      return Boolean(draft.paso5?.deudaTotal?.trim());
    case 6:
      return Boolean(draft.paso6?.tipoGarantia?.trim());
    case 7:
      return Boolean(draft.paso7?.archivos?.length);
    case 8:
      return Boolean(draft.paso8?.socios?.trim());
    case 9:
      return Boolean(
        draft.paso9?.montoSolicitado?.trim() &&
          draft.paso9?.plazo?.trim() &&
          draft.paso9?.destino?.trim(),
      );
    case 10:
      return true;
    default:
      return false;
  }
}

export function wizardStorageKey(empresaId: string): string {
  return `pe:wizard:${empresaId}`;
}
