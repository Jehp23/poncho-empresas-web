import { Suspense } from "react";
import { OperateView } from "@/features/operations/delivery/operate-view";
import { PageFallback } from "@/features/shell/delivery/components/page-fallback";

export default function OperarPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <OperateView />
    </Suspense>
  );
}
