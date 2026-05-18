import { Card } from "@/shared/ui/card";

export function PlaceholderMessage({
  titulo,
  descripcion,
}: {
  titulo: string;
  descripcion: string;
}) {
  return (
    <Card padding="lg">
      <p className="text-label">Próximamente</p>
      <h2 className="font-poncho mt-2 text-xl font-semibold text-ink">{titulo}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{descripcion}</p>
    </Card>
  );
}
