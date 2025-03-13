

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Espresso Console",
  description: "Design and manage your templates with Espresso Console",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <header className="px-6 py-4 border-b-1 border-gray-200">
          <div className="container flex items-center justify-between">
            {/* Left - Logo section */}
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl font-bold tracking-tight">Espresso</span>
                <span className="text-xl font-light ml-1">Console</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          <ToastContainer position="top-right" autoClose={3000} />
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}