import { Suspense } from "react";
import { OperateView } from "@/features/operations/delivery/operate-view";

export default function MovimientosPage() {
  return (
    <Suspense fallback={null}>
      <OperateView defaultTab="movimientos" />
    </Suspense>
  );
}
