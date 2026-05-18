import { DashboardShell } from "@/features/shell/delivery/components/dashboard-shell";
import { EmpresaProvider } from "@/features/shell/delivery/empresa-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmpresaProvider>
      <DashboardShell>{children}</DashboardShell>
    </EmpresaProvider>
  );
}
