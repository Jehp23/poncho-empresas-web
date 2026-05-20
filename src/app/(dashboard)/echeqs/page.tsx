import { Suspense } from "react";
import { EcheqsView } from "@/features/echeqs/delivery/echeqs-view";
import { PageFallback } from "@/features/shell/delivery/components/page-fallback";

export default function EcheqsPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <EcheqsView />
    </Suspense>
  );
}
