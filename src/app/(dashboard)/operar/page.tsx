import { Suspense } from "react";
import { OperateView } from "@/features/operations/delivery/operate-view";

export default function OperarPage() {
  return (
    <Suspense fallback={null}>
      <OperateView />
    </Suspense>
  );
}
