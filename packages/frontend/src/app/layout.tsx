import type { Metadata, Viewport } from 'next';
import './globals.css';
import PWAInitializer from '@/components/PWAInitializer';

export const metadata: Metadata = {
  title: 'Stranger Things Toys Tracker',
  description: 'Track your collection of Kinder Joy Stranger Things toys',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KiSTT',
  },
  applicationName: 'Stranger Things Toys Tracker',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/ios/16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/ios/32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/ios/64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icons/ios/192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/ios/512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/ios/180.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/ios/152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/ios/120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icons/ios/76.png', sizes: '76x76', type: 'image/png' },
      { url: '/icons/ios/60.png', sizes: '60x60', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/ios/512.png',
        color: '#b91c1c',
      },
      {
        rel: 'shortcut icon',
        url: '/icons/ios/192.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#b91c1c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* PWA Service Worker Registration */}
        <PWAInitializer />
        <header className="bg-red-700 text-white p-4">
          <h1 className="text-2xl font-bold">Kinder-Things-Tracker</h1>
          <p className="text-sm">Stranger Things Toy Collection</p>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Kinder Things Tracker
        </footer>
      </body>
    </html>
  );
}