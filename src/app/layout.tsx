import Providers from '@/components/Providers';
import { cn } from '@/lib/utils';
import '@/styles/global.css';
import { Instrument_Sans } from 'next/font/google';

const font = Instrument_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Devlinks',
  description: 'The link-sharing app for developers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, 'bg-gray-100')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
