// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/app//components/Header';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'The Kenya Trend',
  description: 'Your source for trending news',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="font-sans grid grid-rows-[auto_1fr_auto] min-h-screen px-8 pb-20 gap-16 sm:px-20 sm:pb-20">
        <Header />
        <main className="row-start-2 flex flex-col gap-[32px] items-center sm:items-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}