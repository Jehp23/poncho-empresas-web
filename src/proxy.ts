import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/onboarding", "/_next", "/favicon"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas siempre permitidas
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Rutas del dashboard requieren sesión
  const session = request.cookies.get("pe:session")?.value;
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas excepto archivos estáticos y api de Next.js.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
