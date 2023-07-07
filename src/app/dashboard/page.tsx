import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
// import { getAuthSession } from '@/lib/auth';
// import { redirect } from 'next/navigation';

export default async function Page() {
  //   const session = await getAuthSession();

  //   if (!session) {
  //     redirect('/signin');
  //   }
  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
}
