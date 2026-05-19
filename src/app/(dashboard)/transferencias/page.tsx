import { Suspense } from "react";
import { OperateView } from "@/features/operations/delivery/operate-view";

export default function TransferenciasPage() {
  return (
    <Suspense fallback={null}>
      <OperateView defaultTab="transferir" />
    </Suspense>
  );
}
