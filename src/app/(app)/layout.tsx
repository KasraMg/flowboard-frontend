import { AppShell } from "@/src/components/modules/layout/app-shell";
import { AuthGuard } from "@/src/providers/auth-guard";

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
