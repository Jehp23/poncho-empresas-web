import { NextResponse } from "next/server";
import {
  DEMO_VALUE,
  SESSION_COOKIE_NAME,
} from "@/features/auth/domain/session-cookie";

function cookieOptions() {
  return {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  };
}

/** Establece la cookie de sesión demo (usar en login/onboarding). */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, DEMO_VALUE, cookieOptions());
  // Limpiar nombre legacy por si quedó mal seteado en el cliente
  res.cookies.set("pe:session", "", { ...cookieOptions(), maxAge: 0 });
  return res;
}

/** Cierra sesión demo. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, "", { ...cookieOptions(), maxAge: 0 });
  res.cookies.set("pe:session", "", { ...cookieOptions(), maxAge: 0 });
  return res;
}
