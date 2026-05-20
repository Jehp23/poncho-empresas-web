export type EcheqEstado = "pendiente" | "por_cobrar" | "acreditado" | "vencido" | "en_revision";

export type EcheqItem = {
  id: string;
  numero: string;
  contraparte: string;
  cuit: string;
  monto: number;
  emision: string;
  vence: string;
  estado: EcheqEstado;
  esEmitido: boolean;
};

export const MOCK_ECHEQS_EMITIDOS: EcheqItem[] = [
  {
    id: "e1",
    numero: "#00119234",
    contraparte: "Proveedor Norte SRL",
    cuit: "20-11223344-5",
    monto: 680_000,
    emision: "10 may",
    vence: "20 may",
    estado: "pendiente",
    esEmitido: true,
  },
  {
    id: "e2",
    numero: "#00123456",
    contraparte: "Globant SA",
    cuit: "30-65432100-1",
    monto: 1_250_000,
    emision: "17 may",
    vence: "25 may",
    estado: "pendiente",
    esEmitido: true,
  },
  {
    id: "e3",
    numero: "#00124500",
    contraparte: "Proveedor Logística",
    cuit: "30-99887766-0",
    monto: 480_000,
    emision: "14 may",
    vence: "30 may",
    estado: "en_revision",
    esEmitido: true,
  },
];

export const MOCK_ECHEQS_RECIBIDOS: EcheqItem[] = [
  {
    id: "r1",
    numero: "#00121890",
    contraparte: "Supermercados Rey SA",
    cuit: "30-89765432-1",
    monto: 2_400_000,
    emision: "14 may",
    vence: "30 may",
    estado: "acreditado",
    esEmitido: false,
  },
  {
    id: "r2",
    numero: "#00123456",
    contraparte: "Distribuidora Centro",
    cuit: "30-65432100-1",
    monto: 1_800_000,
    emision: "17 may",
    vence: "15 jun",
    estado: "por_cobrar",
    esEmitido: false,
  },
  {
    id: "r3",
    numero: "#00117650",
    contraparte: "Retail Max",
    cuit: "30-55667788-9",
    monto: 684_000,
    emision: "05 may",
    vence: "22 may",
    estado: "por_cobrar",
    esEmitido: false,
  },
];

export function filterEcheqs(items: EcheqItem[], filtro: string): EcheqItem[] {
  if (filtro === "todos") return items;
  if (filtro === "pendientes") {
    return items.filter((i) => i.estado === "pendiente" || i.estado === "por_cobrar");
  }
  if (filtro === "acreditados") return items.filter((i) => i.estado === "acreditado");
  if (filtro === "vencidos") return items.filter((i) => i.estado === "vencido");
  return items;
}
