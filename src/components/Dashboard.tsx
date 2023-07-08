import type { FC } from 'react';
import type { Link } from '@prisma/client';

import { Button } from '@/components/ui/Button';
import { TabsContent } from '@/components/ui/Tabs';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

import Preview from '@/components/Preview';
import { Icons } from '@/components/Icons';
import CreateLink from './CreateLink';
import LinkContainer from './LinkContainer';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = async ({}) => {
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
          <CreateLink />
          {/* LinkContainer */}
          <LinkContainer />
        </div>
        <div className="p-4">
          <Button className="w-full">Save</Button>
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
          <div className="mt-10 p-5 rounded-xl bg-background md:flex md:items-center">
            <p className="text-body-md mb-4 text-gray-500 md:basis-2/5">
              Profile Picture
            </p>
            <div className="basis-3/5 md:flex md:items-center">
              <label
                htmlFor="picture"
                className="bg-primary-100 text-heading-sm text-primary-600 px-10 py-16 rounded-xl flex flex-col items-center gap-2 justify-center aspect-square md:min-w-[200px] w-[200px]"
              >
                <Icons.image />
                + Upload Image
                <Input type="file" id="picture" className="hidden" />
              </label>
              <p className="text-body-sm text-gray-500 mt-6 md:mt-0 md:ml-6">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>

          <div className="mt-6 p-5 rounded-xl bg-background">
            <div className="md:flex items-center">
              <Label htmlFor="firstName" className="md:basis-2/5">
                First name*
              </Label>
              <Input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className="mb-3 md:basis-3/5"
              />
            </div>
            <div className="md:flex items-center">
              <Label htmlFor="lastName" className="md:basis-2/5">
                Last name*
              </Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className="mb-3 md:basis-3/5"
              />
            </div>
            <div className="md:flex items-center">
              <Label htmlFor="email" className="md:basis-2/5">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mb-3 md:basis-3/5"
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <Button className="w-full">Save</Button>
        </div>
      </TabsContent>
    </div>
  );
};

export default Dashboard;
