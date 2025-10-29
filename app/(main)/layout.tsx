// app/(main)/layout.tsx
import Header from "@/components/organisms/Header/Header";
import { Sidebar } from "@/components/organisms/Sidebar/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-800 antialiased">
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 h-full">
          <Header currentPage="Home" />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-15">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
