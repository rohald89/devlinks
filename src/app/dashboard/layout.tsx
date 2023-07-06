import { Tabs } from '@/components/ui/Tabs';

export const metadata = {
  title: 'Devlinks | Dashboard',
  description: 'The link-sharing app for developers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Tabs defaultValue="links">{children}</Tabs>;
}
