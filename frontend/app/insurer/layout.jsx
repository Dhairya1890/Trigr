import Navbar from "@/components/shared/Navbar";
import RoleGuard from "@/components/shared/RoleGuard";

export default function InsurerLayout({ children }) {
  return (
    <RoleGuard requiredRole="insurer">
      <Navbar />
      <main className="pt-20 min-h-screen bg-surface-container-low">
        {children}
      </main>
    </RoleGuard>
  );
}
