import { DM_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const dmSans = DM_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={cn('min-h-screen antialiased', dmSans.className)}>
        {children}
      </body>
    </html>
  );
}
