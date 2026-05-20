import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Building2,
  FileText,
  Landmark,
} from "lucide-react";

export type NotificacionItem = {
  id: string;
  titulo: string;
  mensaje: string;
  href: string;
  leida: boolean;
  hace: string;
  icon: LucideIcon;
};

export const MOCK_NOTIFICACIONES: NotificacionItem[] = [
  {
    id: "n1",
    titulo: "Vencimiento eCheq",
    mensaje: "Proveedor Norte · $680.000 vence el 20 may",
    href: "/echeqs?tab=emitidos",
    leida: false,
    hace: "hace 2 h",
    icon: FileText,
  },
  {
    id: "n2",
    titulo: "Conciliación pendiente",
    mensaje: "Galicia tiene 3 débitos sin categorizar",
    href: "/consolidacion#movimientos-bancos",
    leida: false,
    hace: "hace 5 h",
    icon: Building2,
  },
  {
    id: "n3",
    titulo: "Solicitud SGR",
    mensaje: "Tu carpeta financiera está en revisión",
    href: "/financiamiento",
    leida: true,
    hace: "ayer",
    icon: Landmark,
  },
  {
    id: "n4",
    titulo: "Transferencia programada",
    mensaje: "Pago a LogiTrans SRL · $680.000",
    href: "/operar?tab=movimientos",
    leida: true,
    hace: "ayer",
    icon: AlertTriangle,
  },
];
