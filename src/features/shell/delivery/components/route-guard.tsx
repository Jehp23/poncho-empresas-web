"use client";

import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { canAccessRoute, getRolDescripcion } from "@/features/shell/domain/roles";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import { RoleBadge } from "@/features/shell/delivery/components/role-badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data } = useEmpresa();
  const rol = data.usuario.rol;

  if (canAccessRoute(rol, pathname)) {
    return <>{children}</>;
  }

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-1 flex-col items-center justify-center px-6 py-16">
      <Card padding="lg" className="w-full text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-warning" />
        <div className="mt-4 flex justify-center">
          <RoleBadge rol={rol} />
        </div>
        <h1 className="font-display mt-4 text-xl font-semibold text-ink">
          Sin permiso para esta sección
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tu rol ({getRolDescripcion(rol)}) no incluye acceso a esta pantalla.
          Demo — cambiá el rol en Ajustes para probar otros perfiles.
        </p>
        <Link href="/inicio" className="mt-6 inline-block">
          <Button>Volver al inicio</Button>
        </Link>
      </Card>
    </main>
  );
}
