import type { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { TabsContent } from '@/components/ui/Tabs';

import Mockup from '@/components/Mockup';
import CreateLink from './CreateLink';
import LinkContainer from './LinkContainer';
import ProfileDetails from './ProfileDetails';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { utapi } from 'uploadthing/server';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = async ({}) => {
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
  if (profile.picture !== null) {
    profileImage = await utapi.getFileUrls(profile?.picture);
  }
  return (
    <div className="flex gap-6">
      {/* Mockup preview on Desktop */}
      <Mockup />

      {/* Link TabContent */}
      {/* <div className="h-full"> */}
      <TabsContent value="links">
        <div className="flex flex-col">
          <div className="flex-1 border-b border-gray-300 dark:border-slate-700 p-6">
            <h1 className="text-2xl font-bold md:text-heading-md dark:text-slate-100">
              Customize your links
            </h1>
            <p className="mt-2 text-body-md text-gray-500 dark:text-slate-300">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
            {/* {!links.length && <CreateLink />} */}
            <LinkContainer links={links} />
          </div>
          <div className="p-4">
            <Button className="w-full" type="submit" form="editLinks">
              Save
            </Button>
          </div>
        </div>
      </TabsContent>

      {/* Profile TabContent */}
      <TabsContent value="profile">
        <div className="border-b border-gray-300 dark:border-slate-700 p-6">
          <h1 className="text-2xl font-bold md:text-heading-md dark:text-slate-100">
            Profile Details
          </h1>
          <p className="mt-2 text-body-md text-gray-500 dark:text-slate-300 ">
            Add your details to create a personal touch to your profile.
          </p>
          <ProfileDetails
            profile={profile}
            image={profileImage ? profileImage[0].url : null}
          />
        </div>
        <div className="p-4">
          <Button className="w-full" type="submit" form="editProfile">
            Save
          </Button>
        </div>
      </TabsContent>
    </div>
    // </div>
  );
};

export default Dashboard;
