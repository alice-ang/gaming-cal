import { NavBar, ThemeProvider } from '@/components';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Dialog } from '@/components/ui/dialog';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, '')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Dialog>
            <NavBar />
            {children}
            <Toaster />
          </Dialog>
        </ThemeProvider>
      </body>
    </html>
  );
}
