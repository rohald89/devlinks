import { FC } from 'react';
import { TabsContent } from './ui/Tabs';
import { Button } from './ui/Button';
import GetStarted from './GetStarted';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <>
      <TabsContent value="links">
        <div className="border-b border-gray-300 p-6">
          <h1 className="text-2xl font-bold md:text-heading-md">
            Customize your links
          </h1>
          <p className="mt-2 text-body-md text-gray-500">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button variant="outline" className="w-full mt-10">
            + Add new Link
          </Button>
          {/* TODO Render all created link forms */}
          {/* TODO Render GetStarted when no links are created */}
          <GetStarted />
        </div>
        <div className="p-4">
          <Button disabled className="w-full">
            Save
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="profile">Profile</TabsContent>
    </>
  );
};

export default Dashboard;
