import type { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { TabsContent } from '@/components/ui/Tabs';

import Preview from '@/components/Preview';
import CreateLink from './CreateLink';
import LinkContainer from './LinkContainer';
import ProfileDetails from './ProfileDetails';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

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

  return (
    <div className="m-6 flex gap-6">
      {/* Mockup preview on Desktop */}
      <Preview />

      {/* Link TabContent */}
      <TabsContent value="links">
        <div className="border-b border-gray-300 p-6">
          <h1 className="text-2xl font-bold md:text-heading-md">
            Customize your links
          </h1>
          <p className="mt-2 text-body-md text-gray-500">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          {!links.length && <CreateLink />}
          {/* LinkContainer */}
          <LinkContainer links={links} />
        </div>
        <div className="p-4">
          <Button className="w-full" type="submit" form="editLinks">
            Save
          </Button>
        </div>
      </TabsContent>

      {/* Profile TabContent */}
      <TabsContent value="profile">
        <div className="border-b border-gray-300 p-6">
          <h1 className="text-2xl font-bold md:text-heading-md">
            Profile Details
          </h1>
          <p className="mt-2 text-body-md text-gray-500 ">
            Add your details to create a personal touch to your profile.
          </p>
          <ProfileDetails profile={profile} />
        </div>
        <div className="p-4">
          <Button className="w-full" type="submit" form="editProfile">
            Save
          </Button>
        </div>
      </TabsContent>
    </div>
  );
};

export default Dashboard;
