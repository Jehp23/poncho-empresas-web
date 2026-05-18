import { Suspense } from "react";
import { EcheqsView } from "@/features/echeqs/delivery/echeqs-view";

export default function EcheqsPage() {
  return (
    <Suspense fallback={null}>
      <EcheqsView />
    </Suspense>
  );
}
