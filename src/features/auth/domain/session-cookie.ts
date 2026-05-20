import { SESSION_COOKIE_NAME } from "@/features/shell/domain/empresa-context";

const DEMO_VALUE = "demo";

/** Lee la cookie de sesión demo (proxy + compat legacy). */
export function getSessionFromCookies(
  cookies: { get: (name: string) => { value: string } | undefined },
): string | undefined {
  return (
    cookies.get(SESSION_COOKIE_NAME)?.value ??
    cookies.get("pe:session")?.value
  );
}

export { SESSION_COOKIE_NAME, DEMO_VALUE };
