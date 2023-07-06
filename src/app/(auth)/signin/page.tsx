import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="bg-white rounded-xl w-full max-w-lg md:p-10">
      <h1 className="text-2xl mb-2 font-bold md:text-heading-md">Login</h1>
      <p className="text-body-md text-gray-500">
        Add your details below to get back into the app
      </p>
    </div>
  );
};

export default page;
