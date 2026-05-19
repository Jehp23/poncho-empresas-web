import { Suspense } from "react";
import { OperateView } from "@/features/operations/delivery/operate-view";

export default function DepositosPage() {
  return (
    <Suspense fallback={null}>
      <OperateView defaultTab="depositar" />
    </Suspense>
  );
}
