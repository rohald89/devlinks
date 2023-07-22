import { LoginButton, LogoutButton } from '@/components/Auth';
import ClientSession from '@/components/ClientSession';
import { getAuthSession } from '@/lib/auth';

import Hero from '@/components/Hero';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import { Icons } from '@/components/Icons';

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div className="relative bg-gray-100 dark:bg-slate-900">
      <header className="fixed md:top-6 shadow-card z-10 w-full md:w-11/12 md:left-1/2 md:-translate-x-1/2 bg-white dark:bg-slate-950 rounded-b-xl p-4 flex items-center justify-between md:rounded-xl">
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

        <Link
          href="/signin"
          className={buttonVariants({
            variant: 'outline',
            className: 'px-4 md:px-7',
          })}
        >
          <span className="">Login</span>
        </Link>
      </header>

      <Hero />
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>

      <h2>Client Session</h2>
      <ClientSession />
    </div>
  );
}
