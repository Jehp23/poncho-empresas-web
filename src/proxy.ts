import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookies } from "@/features/auth/domain/session-cookie";

const PUBLIC_PATHS = ["/login", "/onboarding", "/api/auth", "/_next", "/favicon"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const session = getSessionFromCookies(request.cookies);
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
