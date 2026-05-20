import { SESSION_STORAGE_KEY } from "@/features/shell/domain/empresa-context";

/** Crea sesión demo vía API (cookie httpOnly) y navega con full reload. */
export async function startDemoSession(redirectTo: string): Promise<void> {
  localStorage.setItem(SESSION_STORAGE_KEY, "demo");
  const res = await fetch("/api/auth/demo", { method: "POST" });
  if (!res.ok) {
    throw new Error("No se pudo iniciar la sesión demo");
  }
  window.location.assign(redirectTo);
}

/** Cierra sesión demo. */
export async function endDemoSession(): Promise<void> {
  localStorage.removeItem(SESSION_STORAGE_KEY);
  await fetch("/api/auth/demo", { method: "DELETE" });
  window.location.assign("/login");
}
