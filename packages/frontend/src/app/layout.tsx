import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KiSTT - Kinder Stranger Things Tracker',
  description: 'Track your collection of Kinder Joy Stranger Things toys',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-red-700 text-white p-4">
          <h1 className="text-2xl font-bold">KiSTT</h1>
          <p className="text-sm">Kinder Stranger Things Tracker</p>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 text-center text-sm">
          &copy; {new Date().getFullYear()} KiSTT - Kinder Stranger Things Tracker
        </footer>
      </body>
    </html>
  );
}