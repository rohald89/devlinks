'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useMutation } from '@tanstack/react-query';
import { SignUpRequest, SignUpValidator } from '@/lib/validators/auth';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: async ({ email, password, confirmPassword }: SignUpRequest) => {
      const payload: SignUpRequest = {
        email,
        password,
        confirmPassword,
      };

      const { data } = await axios.post(`/api/signup`, payload);
      return data;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Email already taken',
            description: 'Please try again with a different email.',
            variant: 'destructive',
          });
        }
      }

      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        description: 'Account created successfully',
      });
      signIn();
    },
  });
  return (
    <form
      className="bg-white rounded-xl w-full max-w-lg md:p-10"
      onSubmit={handleSubmit((e) => {
        console.log(e);
        createUser(e);
      })}
    >
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
        {...register('email')}
      />
      {errors.email && (
        <p className="text-body-sm text-red-500">{errors.email.message}</p>
      )}

      <Label htmlFor="password">Create password</Label>
      <Input
        icon="lock"
        type="password"
        id="password"
        placeholder="At least 8 characters"
        className="mb-6"
        {...register('password')}
      />
      {errors.password && (
        <p className="text-body-sm text-red-500">{errors.password.message}</p>
      )}

      <Label htmlFor="password">Confirm password</Label>
      <Input
        icon="lock"
        type="password"
        id="password"
        placeholder="At least 8 characters"
        className="mb-6"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <p className="text-body-sm text-red-500">
          {errors.confirmPassword.message}
        </p>
      )}
      <p className="text-body-sm mb-6 text-gray-500">
        Password must contain at least 8 characters
      </p>
      <Button
        isLoading={isLoading}
        className="w-full"
        variant="primary"
        type="submit"
      >
        Create new account
      </Button>

      <p className="text-center text-gray-500 mt-6 flex flex-col xl:flex-row xl:gap-1 xl:justify-center">
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

export default SignUp;
