import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";

/*
 * Tipografía:
 *  - DM Sans  → cuerpo de texto, UI labels, inputs (var --font-sans)
 *  - Poppins  → títulos, números destacados, display (var --font-display)
 *
 * Poppins ya estaba; se reemplaza Inter por DM Sans (más cercano al diseño
 * propuesto por el jefe en poncho-empresa.html).
 */
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  axes: ["opsz"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Poncho Empresas",
    template: "%s | Poncho Empresas",
  },
  description:
    "Plataforma financiera B2B para PYMES — operativa, inversión y financiamiento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
