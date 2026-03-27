import './globals.css';

export const metadata = {
  title: 'MyLedger - Personal Finance Dashboard',
  description: "Trish's personal finance management app",
  manifest: '/manifest.json',
  themeColor: '#7c3aed',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MyLedger" />
      </head>
      <body className="bg-purple-50 min-h-screen">{children}</body>
    </html>
  );
}
