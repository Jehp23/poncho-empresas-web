"use client";

import { useState } from "react";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { RoleBadge } from "@/features/shell/delivery/components/role-badge";
import { ROL_LABELS, type RolUsuario } from "@/features/shell/domain/roles";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";
import { useUiFeedback } from "@/shared/ui/ui-feedback";

type UsuarioEquipo = {
  id: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
  activo: boolean;
};

const MOCK_USUARIOS: UsuarioEquipo[] = [
  {
    id: "u1",
    nombre: "María González",
    email: "maria@techsolutions.com",
    rol: "admin",
    activo: true,
  },
  {
    id: "u2",
    nombre: "Carlos Ruiz",
    email: "carlos@techsolutions.com",
    rol: "finanzas",
    activo: true,
  },
  {
    id: "u3",
    nombre: "Laura Méndez",
    email: "laura@techsolutions.com",
    rol: "tesoreria",
    activo: true,
  },
  {
    id: "u4",
    nombre: "Pablo Conti",
    email: "pablo@estudio.com",
    rol: "contador",
    activo: true,
  },
];

export function UsuariosView() {
  const { data } = useEmpresa();
  const { confirm, toast } = useUiFeedback();
  const [usuarios] = useState(MOCK_USUARIOS);

  function invitar() {
    confirm({
      title: "Invitar usuario",
      description:
        "Demo — se enviaría un email de invitación a un nuevo miembro del equipo.",
      confirmLabel: "Enviar invitación",
      onConfirm: () => toast("Invitación enviada — demo", "success"),
    });
  }

  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="Usuarios"
        subtitulo={`Equipo de ${data.empresa.nombre}`}
        accion={
          <Button onClick={invitar}>Invitar usuario</Button>
        }
      />

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-muted/50">
                {["Nombre", "Email", "Rol", "Estado", "Acciones"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-border-subtle last:border-0 hover:bg-surface-muted/30"
                >
                  <td className="px-5 py-4 font-medium text-ink">{u.nombre}</td>
                  <td className="px-5 py-4 text-muted">{u.email}</td>
                  <td className="px-5 py-4">
                    <RoleBadge rol={u.rol} />
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={u.activo ? "success-vivid" : "default"}>
                      {u.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Button
                      variant="ghost"
                      className="h-8 px-3 text-xs"
                      onClick={() =>
                        toast(`Editar ${u.nombre} (${ROL_LABELS[u.rol]}) — demo`, "info")
                      }
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-4 text-xs text-faint">
        Demo — solo visible para rol Administrador.
      </p>
    </PageShell>
  );
}
