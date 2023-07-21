import { Icons } from '@/components/Icons';

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
    <div className="p-8 md:p-0 bg-white dark:bg-slate-950 md:bg-gray-100 flex md:items-center md:justify-center flex-col min-h-screen">
      <Icons.logo className="mb-16" />
      {children}
    </div>
  );
}
