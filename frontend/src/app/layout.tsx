import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RaimonVibe Image Converter",
  description: "Convert images across formats. 20 free/day, $1.98/month unlimited.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-sky-50 text-slate-800 antialiased`}>
        <Providers>
          <header className="border-b bg-white">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-semibold text-sky-700">Image Converter</Link>
              <nav className="flex gap-4 text-sm">
                <Link href="/convert" className="text-slate-600 hover:text-sky-700">Convert</Link>
                <Link href="/billing" className="text-slate-600 hover:text-sky-700">Pricing</Link>
                <Link href="/account" className="text-slate-600 hover:text-sky-700">Account</Link>
              </nav>
            </div>
          </header>
          <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
