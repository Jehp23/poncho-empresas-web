"use client";

import { useState } from "react";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import { PageShell } from "@/features/shell/delivery/components/page-shell";
import { RoleBadge } from "@/features/shell/delivery/components/role-badge";
import {
  ROL_LABELS,
  getRolDescripcion,
  type RolUsuario,
} from "@/features/shell/domain/roles";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { PageHeaderRow } from "@/shared/ui/page-header-row";
import { useUiFeedback } from "@/shared/ui/ui-feedback";
import { cn } from "@/shared/lib/cn";

const INTEGRACIONES = [
  { id: "galicia", nombre: "Banco Galicia", estado: "conectado" as const },
  { id: "macro", nombre: "Banco Macro", estado: "conectado" as const },
  { id: "nacion", nombre: "Banco Nación", estado: "actualizando" as const },
  { id: "bbva", nombre: "BBVA", estado: "desconectado" as const },
];

const NOTIFICACIONES = [
  { id: "vencimientos", label: "Vencimientos de eCheqs", defaultOn: true },
  { id: "conciliacion", label: "Alertas de conciliación", defaultOn: true },
  { id: "financiamiento", label: "Estado de solicitud SGR", defaultOn: true },
  { id: "resumen", label: "Resumen semanal por email", defaultOn: false },
];

const ROLES: RolUsuario[] = ["admin", "finanzas", "tesoreria", "contador"];

export function AjustesView() {
  const {
    data,
    setRolDemo,
    simulateOffline,
    setSimulateOffline,
  } = useEmpresa();
  const { toast } = useUiFeedback();
  const [toggles, setToggles] = useState(
    Object.fromEntries(NOTIFICACIONES.map((n) => [n.id, n.defaultOn])),
  );

  return (
    <PageShell ancho="completo">
      <PageHeaderRow
        titulo="Ajustes"
        subtitulo="Configuración de la empresa y preferencias."
      />

      <div className="space-y-6">
        <Card padding="lg">
          <p className="text-section-title mb-1">Perfil demo</p>
          <p className="mb-4 text-sm text-muted">
            Cambiá el rol para probar permisos de navegación y acciones.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {ROLES.map((rol) => (
              <button
                key={rol}
                type="button"
                onClick={() => {
                  setRolDemo(rol);
                  toast(`Rol cambiado a ${ROL_LABELS[rol]} — demo`, "info");
                }}
                className={cn(
                  "rounded-lg border px-4 py-3 text-left transition-colors",
                  data.usuario.rol === rol
                    ? "border-primary bg-primary-soft/40"
                    : "border-border-subtle hover:bg-surface-muted",
                )}
              >
                <RoleBadge rol={rol} />
                <p className="mt-2 text-xs text-muted">{getRolDescripcion(rol)}</p>
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="mt-3 text-xs"
            onClick={() => {
              setRolDemo(null);
              toast("Rol restaurado al mock por defecto", "info");
            }}
          >
            Restaurar rol original
          </Button>
        </Card>

        <Card padding="lg">
          <p className="text-section-title mb-4">Datos de la empresa</p>
          <dl className="grid gap-3 sm:grid-cols-2">
            {[
              ["Razón social", data.empresa.nombre],
              ["CUIT", data.empresa.cuit],
              ["Usuario", data.usuario.nombre],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg bg-surface-muted/60 px-4 py-3"
              >
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
              </div>
            ))}
            <div className="rounded-lg bg-surface-muted/60 px-4 py-3">
              <dt className="text-xs text-muted">Rol activo</dt>
              <dd className="mt-1">
                <RoleBadge rol={data.usuario.rol} />
              </dd>
            </div>
          </dl>
        </Card>

        <Card padding="lg">
          <p className="text-section-title mb-4">Demo — conexión</p>
          <div className="flex items-center justify-between rounded-lg border border-border-subtle px-4 py-3">
            <div>
              <p className="text-sm font-medium text-ink">Simular modo offline</p>
              <p className="text-xs text-muted">
                Muestra banner de error y datos mock
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={simulateOffline}
              onClick={() => setSimulateOffline(!simulateOffline)}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                simulateOffline ? "bg-warning" : "bg-border-strong",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                  simulateOffline ? "left-[22px]" : "left-0.5",
                )}
              />
            </button>
          </div>
        </Card>

        <Card padding="lg">
          <p className="text-section-title mb-4">Notificaciones</p>
          <ul className="space-y-3">
            {NOTIFICACIONES.map((n) => (
              <li
                key={n.id}
                className="flex items-center justify-between rounded-lg border border-border-subtle px-4 py-3"
              >
                <span className="text-sm text-ink">{n.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={toggles[n.id]}
                  onClick={() =>
                    setToggles((t) => ({ ...t, [n.id]: !t[n.id] }))
                  }
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    toggles[n.id] ? "bg-primary" : "bg-border-strong",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                      toggles[n.id] ? "left-[22px]" : "left-0.5",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card padding="lg">
          <p className="text-section-title mb-4">Integraciones bancarias</p>
          <ul className="space-y-2">
            {INTEGRACIONES.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between rounded-lg bg-surface-muted/60 px-4 py-3"
              >
                <span className="text-sm font-medium text-ink">{b.nombre}</span>
                <Badge
                  variant={
                    b.estado === "conectado"
                      ? "success-vivid"
                      : b.estado === "actualizando"
                        ? "warning"
                        : "default"
                  }
                >
                  {b.estado === "conectado"
                    ? "Conectado"
                    : b.estado === "actualizando"
                      ? "Actualizando"
                      : "Desconectado"}
                </Badge>
              </li>
            ))}
          </ul>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => toast("Próximamente: conectar banco — demo", "info")}
          >
            Conectar banco — demo
          </Button>
        </Card>
      </div>
    </PageShell>
  );
}
