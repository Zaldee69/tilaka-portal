import { DM_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const dmSans = DM_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
          'lg:min-h-screen antialiased scroll-smooth',
          dmSans.className
        )}
      >
        <Toaster richColors visibleToasts={10} />
        {children}
      </body>
    </html>
  );
}
