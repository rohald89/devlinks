import { FC } from 'react';
import { Icons } from './Icons';

interface GetStartedProps {}

const GetStarted: FC<GetStartedProps> = ({}) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 px-5 py-11 space-y-6 mt-6 rounded-xl text-center">
      {/* TODO reduce viewbox on mobile */}
      <Icons.getStarted className="w-1/2 max-w-xs mx-auto" />
      <h2 className="text-2xl font-bold md:text-heading-md">
        Let's get you started
      </h2>
      <p className="text-body-md text-gray-500">
        Use the "Add new link" button to get started. Once you have more than
        one link, you can reorder and edit them. We're here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
};

export default GetStarted;
