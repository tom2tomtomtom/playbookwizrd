import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import { Providers } from './providers';
import AuthGuard from './components/AuthGuard';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brandy Playbook Architect",
  description: "Brandy’s AI-powered playbook builder and strategist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50">
      <body
        className={`font-brand bg-gray-50 text-gray-900 min-h-screen antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <Header />
        <Providers>
          <AuthGuard>
            <main className="max-w-4xl mx-auto px-4 py-6">
              {children}
            </main>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
