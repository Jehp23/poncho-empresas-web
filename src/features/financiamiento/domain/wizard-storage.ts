import {
  createEmptyDraft,
  type WizardDraft,
  wizardStorageKey,
} from "./wizard-schema";

export function loadWizardDraft(empresaId: string): WizardDraft {
  if (typeof window === "undefined") return createEmptyDraft(empresaId);
  const raw = localStorage.getItem(wizardStorageKey(empresaId));
  if (!raw) return createEmptyDraft(empresaId);
  try {
    return JSON.parse(raw) as WizardDraft;
  } catch {
    return createEmptyDraft(empresaId);
  }
}

export function saveWizardDraft(draft: WizardDraft): void {
  localStorage.setItem(
    wizardStorageKey(draft.empresaId),
    JSON.stringify({ ...draft, updatedAt: new Date().toISOString() }),
  );
}

export function clearWizardDraft(empresaId: string): void {
  localStorage.removeItem(wizardStorageKey(empresaId));
}
