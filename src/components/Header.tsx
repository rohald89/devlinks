import { FC } from 'react';
import { TabsContent, TabsList, TabsTrigger } from './ui/Tabs';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="bg-white rounded-b-xl p-4 flex items-center justify-between">
      <h1>Logo</h1>
      <TabsList>
        <TabsTrigger value="links"></TabsTrigger>
        <TabsTrigger value="profile"></TabsTrigger>
      </TabsList>
      <p>Preview</p>
    </header>
  );
};

export default Header;
