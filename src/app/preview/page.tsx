import PreviewBackground from '@/components/PreviewBackground';
import PreviewCard from '@/components/PreviewCard';
import PreviewHeader from '@/components/PreviewHeader';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function PreviewPage() {
  const session = await getAuthSession();
  if (!session) return notFound();

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      links: true,
      profile: true,
    },
  });

  return (
    <div className="relative md:p-6 bg-white dark:bg-slate-900 md:dark:bg-slate-950 md:bg-gray-100 min-h-screen">
      <PreviewBackground />
      <PreviewHeader userId={session.user.id} />
      <PreviewCard user={user} />
    </div>
  );
}
