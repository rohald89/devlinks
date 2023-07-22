import { FC } from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="bg-white dark:bg-slate-900 rounded-b-xl p-4 flex items-center justify-between md:rounded-xl">
      {/* TODO find cleaner way for mobile / desktop differences */}
      <span className="md:hidden">
        <Icons.smallLogo />
      </span>
      <span className="hidden md:block">
        <Icons.logo
          width={136}
          height={32}
          className="text-gray-900 dark:text-slate-100"
        />
      </span>
      <TabsList>
        <TabsTrigger value="links" asChild>
          <Button variant="ghost">
            <Icons.link></Icons.link>
            <span className="hidden text-heading-sm md:block">Links</span>
          </Button>
        </TabsTrigger>
        <TabsTrigger value="profile" asChild>
          <Button variant="ghost">
            <Icons.user></Icons.user>
            <span className="hidden text-heading-sm md:block">
              Profile Details
            </span>
          </Button>
        </TabsTrigger>
      </TabsList>
      <Link
        href="/preview"
        className={buttonVariants({
          variant: 'outline',
          className: 'px-4 md:px-7',
        })}
      >
        <span className="md:hidden">
          <Icons.preview />
        </span>
        <span className="hidden md:block">Preview</span>
      </Link>
    </header>
  );
};

export default Header;
