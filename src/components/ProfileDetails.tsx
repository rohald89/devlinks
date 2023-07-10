'use client';

import { FC } from 'react';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Icons } from './Icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ProfileRequest, ProfileValidator } from '@/lib/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';

interface ProfileDetailsProps {}

const ProfileDetails: FC<ProfileDetailsProps> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileRequest>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: async () => {
      const { data } = await axios.get('/api/profile');
      return data;
    },
  });

  const { mutate: editProfile, isLoading: isEditing } = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      bio,
      picture,
    }: ProfileRequest) => {
      const payload: ProfileRequest = {
        firstName,
        lastName,
        email,
        bio,
        picture,
      };

      console.log('payload', payload);
      const { data } = await axios.patch('api/profile', payload);
      return data;
    },
    onError: (err) => {
      // TODO - handle error
      console.log(err);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    },
  });

  return (
    <form
      id="editProfile"
      onSubmit={handleSubmit((e) => {
        console.log(e);
        editProfile(e);
      })}
    >
      <div className="mt-10 p-5 rounded-xl bg-background ">
        <div className="md:flex md:items-center">
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
        <div className="md:flex items-center mt-6">
          <Label htmlFor="firstName" className="md:basis-2/5">
            Bio
          </Label>
          <Input
            type="text"
            id="bio"
            placeholder="Provide a short bio about yourself"
            className="mb-3 md:basis-3/5"
            {...register('bio')}
          />
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
            {...register('firstName')}
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
            {...register('lastName')}
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
            {...register('email')}
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileDetails;
