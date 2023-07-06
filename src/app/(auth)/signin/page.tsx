import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <form className="bg-white rounded-xl w-full max-w-lg md:p-10">
      <h1 className="text-2xl mb-2 font-bold md:text-heading-md">Login</h1>
      <p className="text-body-md mb-10 text-gray-500">
        Add your details below to get back into the app
      </p>

      <Label htmlFor="email">Email address</Label>
      <Input
        icon="mail"
        type="email"
        id="email"
        placeholder="e.g. alex@email.com"
        className="mb-6"
      />

      <Label htmlFor="password">Password</Label>
      <Input
        icon="lock"
        type="password"
        id="password"
        placeholder="Enter your password"
        className="mb-6"
      />
      <Button className="w-full" variant="primary" type="submit">
        Login
      </Button>
      <p className="text-center text-gray-500 mt-6 flex flex-col xl:flex-row xl:gap-1 xl:justify-center">
        Don't have an account?
        <span className="text-primary-600">
          <Link href="/signup" className="text-center">
            Create account
          </Link>
        </span>
      </p>
    </form>
  );
};

export default page;
