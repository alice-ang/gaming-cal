import { NavBar, ThemeProvider } from '@/components';
import { Dialog } from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'rankup.gg',
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
