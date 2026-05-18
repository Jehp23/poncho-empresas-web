import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-poncho",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
    <html lang="es" className={`${inter.variable} ${montserrat.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
