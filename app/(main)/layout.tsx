"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/organisms/Header/Header";
import { Sidebar } from "@/components/organisms/Sidebar/Sidebar";

const getPageName = (pathname: string): string => {
  if (pathname === "/") return "Home";
  if (pathname === "/coins") return "Coins";
  if (pathname === "/portfolio") return "Portfolio";
  if (pathname === "/activities") return "Activities";
  if (pathname === "/profile") return "Profile";
  return "Home";
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPage = getPageName(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-dvh w-full overflow-hidden bg-neutral-800 antialiased">
      <div className="flex h-full min-h-0 w-full overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Header
            currentPage={currentPage}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-8 lg:p-15">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
