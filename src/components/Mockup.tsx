import { FC } from 'react';
import { Icons } from './Icons';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import Image from 'next/image';
import { utapi } from 'uploadthing/server';
import LinkCard from './LinkCard';

interface MockupProps {}

const Mockup: FC<MockupProps> = async ({}) => {
  const session = await getAuthSession();

  const { links, profile } = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      links: true,
      profile: true,
    },
  });

  let profileImage = null;
  if (profile.picture) {
    profileImage = await utapi.getFileUrls(profile?.picture);
  }

  return (
    <div className="hidden p-32 rounded-xl xl:flex items-center justify-center bg-white">
      <div className="w-[307px] h-[631px] relative">
        <div className="absolute inset-0 z-20 pt-16 flex flex-col items-center">
          {profileImage ? (
            <Image
              src={profileImage[0].url}
              width={96}
              height={96}
              alt="profile image"
              className="rounded-full border-4 border-primary-600"
            />
          ) : (
            <div className=" w-[96px] h-[96px] rounded-full bg-gray-200"></div>
          )}

          {profile?.firstName && profile?.lastName ? (
            <h1 className="text-heading-sm font-bold mt-5 text-center ">
              {profile?.firstName} {profile?.lastName}
            </h1>
          ) : (
            <div className="bg-gray-200 h-4 rounded-lg mt-6 w-40"></div>
          )}

          {profile?.email ? (
            <p className="text-body-sm text-gray-500 mt-2">{profile.email}</p>
          ) : (
            <div className="bg-gray-200 h-2 rounded-lg mt-4 w-[72px]"></div>
          )}

          <div className="mt-12 space-y-5">
            {links?.map((link) => (
              <LinkCard key={link.id} link={link} size="sm" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 z-10">
          <Icons.mockup />
        </div>
      </div>
    </div>
  );
};

export default Mockup;
