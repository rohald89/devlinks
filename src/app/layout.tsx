import '@/styles/globals.css';
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
      <body className={font.className}>{children}</body>
    </html>
  );
}
