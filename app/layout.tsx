import type { Metadata } from "next";
import Header from "../src/components/Header";
import { Toaster } from "@/src/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "CESIZEN",
  description: "L'application de votre santé mentale",
};

// Définit la structure commune de toutes les pages (ex. : Header, styles globaux, notifications)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-22 md:pt-28">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
