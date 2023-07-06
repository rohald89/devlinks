import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <form className="bg-white rounded-xl w-full max-w-lg md:p-10">
      <h1 className="text-2xl mb-2 font-bold md:text-heading-md">
        Create account
      </h1>
      <p className="text-body-md mb-10 text-gray-500">
        Let's get you started sharing your links!
      </p>

      <Label htmlFor="email">Email address</Label>
      <Input
        icon="mail"
        type="email"
        id="email"
        placeholder="e.g. alex@email.com"
        className="mb-6"
      />

      <Label htmlFor="password">Create password</Label>
      <Input
        icon="lock"
        type="password"
        id="password"
        placeholder="At least 8 characters"
        className="mb-6"
      />

      <Label htmlFor="password">Confirm password</Label>
      <Input
        icon="lock"
        type="password"
        id="password"
        placeholder="At least 8 characters"
        className="mb-6"
      />
      <p className="text-body-sm mb-6 text-gray-500">
        Password must contain at least 8 characters
      </p>
      <Button className="w-full" variant="primary" type="submit">
        Create new account
      </Button>

      <p className="text-center text-gray-500 mt-6 flex flex-col">
        Already have an account?
        <span className="text-primary-600">
          <Link href="/signin" className="text-center">
            Login
          </Link>
        </span>
      </p>
    </form>
  );
};

export default page;
