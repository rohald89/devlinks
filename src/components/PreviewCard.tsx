import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Link } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import { utapi } from 'uploadthing/server';
import LinkCard from './LinkCard';

interface PreviewCardProps {}

const PreviewCard: FC<PreviewCardProps> = async ({}) => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      links: {
        orderBy: {
          order: 'asc',
        },
      },
      profile: true,
    },
  });

  const profileImage = await utapi.getFileUrls(user?.profile?.picture);
  console.log(profileImage[0].url);

  return (
    <div
      className="z-30 bg-white flex flex-col justify-center items-center pt-32 md:py-12 md:px-14 md:rounded-[24px]
    md:absolute md:top-[200px] md:right-1/2 md:translate-x-1/2
    max-w-[350px] "
    >
      <Image
        src={profileImage[0].url}
        width={104}
        height={104}
        alt="profile image"
        className="rounded-full border-4 border-primary-600"
      />
      <h1 className="text-heading-md font-bold mt-6 text-center ">
        {user?.profile?.firstName} {user?.profile?.lastName}
      </h1>
      <p className="text-body-md text-gray-500 mt-2">{user?.profile?.email}</p>
      <div className="mt-14 space-y-5">
        {user?.links?.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
};

export default PreviewCard;
