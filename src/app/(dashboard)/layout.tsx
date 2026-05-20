"use client";

import { DashboardShell } from "@/features/shell/delivery/components/dashboard-shell";
import { RouteGuard } from "@/features/shell/delivery/components/route-guard";
import { EmpresaProvider } from "@/features/shell/delivery/empresa-provider";
import { UiFeedbackProvider } from "@/shared/ui/ui-feedback";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmpresaProvider>
      <UiFeedbackProvider>
        <DashboardShell>
          <RouteGuard>{children}</RouteGuard>
        </DashboardShell>
      </UiFeedbackProvider>
    </EmpresaProvider>
  );
}
