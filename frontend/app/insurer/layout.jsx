import Navbar from "@/components/shared/Navbar";

export default function InsurerLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-surface-container-low">
        {children}
      </main>
    </>
  );
}
