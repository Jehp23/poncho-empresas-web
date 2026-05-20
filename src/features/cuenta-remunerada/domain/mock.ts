export type FciProducto = {
  id: string;
  nombre: string;
  detalle: string;
  tna: number;
  badge: string;
  badgeVariant: "success-vivid" | "accent";
  activo: boolean;
};

export type MovimientoFci = {
  id: string;
  fecha: string;
  descripcion: string;
  monto: number;
  tipo: "suscripcion" | "rescue" | "rendimiento";
};

export const FCI_PRODUCTOS: FciProducto[] = [
  {
    id: "pesos",
    nombre: "Poncho Pesos",
    detalle: "FCI Money Market · Liquidez inmediata",
    tna: 97.5,
    badge: "Activo",
    badgeVariant: "success-vivid",
    activo: true,
  },
  {
    id: "plus",
    nombre: "Poncho Pesos Plus",
    detalle: "FCI Renta Fija · Plazo 30–90 días",
    tna: 118,
    badge: "Mayor rendimiento",
    badgeVariant: "accent",
    activo: false,
  },
];

export const MOVIMIENTOS_FCI: MovimientoFci[] = [
  {
    id: "m1",
    fecha: "18 may",
    descripcion: "Inversión automática MM",
    monto: 520_000,
    tipo: "suscripcion",
  },
  {
    id: "m2",
    fecha: "15 may",
    descripcion: "Rendimiento diario acreditado",
    monto: 34_200,
    tipo: "rendimiento",
  },
  {
    id: "m3",
    fecha: "10 may",
    descripcion: "Suscripción manual",
    monto: 800_000,
    tipo: "suscripcion",
  },
];
