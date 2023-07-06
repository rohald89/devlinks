import { FC } from 'react';
import { TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { Icons } from './Icons';
import { Button } from './ui/Button';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="bg-white rounded-b-xl p-4 flex items-center justify-between">
      <Icons.logo width={32} height={32} />
      <TabsList>
        <TabsTrigger value="links" asChild>
          <Button variant="ghost">
            <Icons.link width={20} height={20}></Icons.link>
          </Button>
        </TabsTrigger>
        <TabsTrigger value="profile" asChild>
          <Button variant="ghost">
            <Icons.user width={20} height={20}></Icons.user>
          </Button>
        </TabsTrigger>
      </TabsList>
      <Button className="px-4" variant="outline">
        <Icons.preview width={20} height={20} />
        <p className="sr-only">Show preview</p>
      </Button>
    </header>
  );
};

export default Header;
