'use client';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInRequest, SignInValidator } from '@/lib/validators/auth';
import { useForm } from 'react-hook-form';

interface SignInProps {}

const SignIn: FC<SignInProps> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInRequest>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInRequest) => {
    const { email, password } = data;
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard',
    });
  };

  return (
    <form
      onSubmit={handleSubmit((e) => {
        onSubmit(e);
      })}
      className="bg-white rounded-xl w-full max-w-lg md:p-10"
    >
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
        {...register('email')}
      />

      <Label htmlFor="password">Password</Label>
      <Input
        icon="lock"
        type="password"
        id="password"
        placeholder="Enter your password"
        className="mb-6"
        {...register('password')}
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

export default SignIn;
