import { ErrorBoundary } from '@/components/common/error-boundary';
import ClientProvider from '@/components/providers/client-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';

// Import the ClientProvider
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hotel Deal Notifier',
  description:
    'Get real-time alerts when hotel prices drop in your chosen destination. Enter your travel dates and email, and never miss the best deal again.',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
          <Toaster />
        </ClientProvider>
      </body>
    </html>
  );
}
