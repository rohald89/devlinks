import { LoginButton, LogoutButton } from '@/components/Auth';
import ClientSession from '@/components/ClientSession';
import { getAuthSession } from '@/lib/auth';

export default async function Home() {
  const session = await getAuthSession();

  return (
    <>
      <h1 className="text-2xl font-bold text-center md:text-heading-md">
        One day, I will be a beautiful landing page 🚀
      </h1>

      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>

      <h2>Client Session</h2>
      <ClientSession />
    </>
  );
}
