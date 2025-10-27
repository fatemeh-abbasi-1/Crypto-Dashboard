import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/Header/Header";
import { Sidebar } from "@/components/organisms/Sidebar/Sidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "Real-time crypto dashboard built with Next.js & TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-stone-900 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 h-full ">
            <Header currentPage="Home" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 ">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
