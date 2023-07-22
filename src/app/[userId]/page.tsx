import LinkCard from '@/components/LinkCard';
import PreviewBackground from '@/components/PreviewBackground';
import PreviewCard from '@/components/PreviewCard';
import PreviewHeader from '@/components/PreviewHeader';
import { db } from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { utapi } from 'uploadthing/server';

interface PageProps {
  params: {
    userId: string;
  };
}

const page = async ({ params }: PageProps) => {
  // Exclude keys from user
  function exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
  }

  const userProfile = await db.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      links: true,
      profile: true,
    },
  });
  const userWithoutPassword = exclude(userProfile, ['password']);

  if (!userWithoutPassword) return notFound();

  let profileImage = null;
  if (userWithoutPassword?.profile?.picture) {
    profileImage = await utapi.getFileUrls(
      userWithoutPassword?.profile?.picture
    );
  }
  return (
    <div className="relative md:p-6 bg-white dark:bg-slate-900 md:dark:bg-slate-950 md:bg-gray-100 min-h-screen">
      <PreviewBackground />
      <PreviewCard user={userWithoutPassword} />
    </div>
  );
};

export default page;
