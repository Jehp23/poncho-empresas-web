export function formatMonto(monto: number, moneda = "ARS"): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: moneda,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(monto);
}

export function formatPorcentaje(valor: number, decimales = 1): string {
  const signo = valor > 0 ? "+" : "";
  return `${signo}${valor.toFixed(decimales)}%`;
}
