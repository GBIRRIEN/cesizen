import type { Metadata } from "next";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "CESIZEN",
  description: "L'application de votre santé mentale",
};

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
        <Footer />
      </body>
    </html>
  );
}
