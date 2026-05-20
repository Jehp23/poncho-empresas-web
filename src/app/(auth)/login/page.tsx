import { Suspense } from "react";
import { LoginView } from "@/features/auth/delivery/login-view";
import { PageFallback } from "@/features/shell/delivery/components/page-fallback";

export default function LoginPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <LoginView />
    </Suspense>
  );
}
