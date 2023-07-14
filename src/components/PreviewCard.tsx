import Image from 'next/image';
import { FC } from 'react';
import { utapi } from 'uploadthing/server';
import LinkCard from './LinkCard';
import { Link, User } from '@prisma/client';

interface PreviewCardProps {
  user: User & { links: Link[]; profile: any };
}

const PreviewCard: FC<PreviewCardProps> = async ({ user }) => {
  let profileImage = null;
  if (user.profile.picture) {
    profileImage = await utapi.getFileUrls(user?.profile?.picture);
  }

  return (
    <div
      className="z-30 mx-auto bg-white flex flex-col justify-center items-center pt-32 md:py-12 md:px-14 md:rounded-[24px]
    md:absolute md:top-[200px] md:right-1/2 md:translate-x-1/2 md:shadow-card
    w-[350px] "
    >
      {profileImage ? (
        <Image
          src={profileImage[0].url}
          width={104}
          height={104}
          alt="profile image"
          className="rounded-full border-4 border-primary-600"
        />
      ) : (
        <div className=" w-[104px] h-[104px] rounded-full bg-gray-200"></div>
      )}

      {!user?.profile?.firstName && !user?.profile?.lastName ? (
        <div className="bg-gray-200 h-5 rounded-lg mt-6 w-48"></div>
      ) : (
        <h1 className="text-heading-md font-bold mt-6 text-center ">
          {user?.profile?.firstName} {user?.profile?.lastName}
        </h1>
      )}

      {!user?.profile?.email ? (
        <div className="bg-gray-200 h-3 rounded-lg mt-2 w-24"></div>
      ) : (
        <p className="text-body-md text-gray-500 mt-2">
          {user?.profile?.email}
        </p>
      )}
      <div className="mt-14 space-y-5">
        {user?.links?.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
        {user?.links?.length === 0 && (
          <>
            <div className="bg-gray-200 h-12 rounded-lg mt-2 w-48"></div>
            <div className="bg-gray-200 h-12 rounded-lg mt-2 w-48"></div>
            <div className="bg-gray-200 h-12 rounded-lg mt-2 w-48"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default PreviewCard;
