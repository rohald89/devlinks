'use client';

import { FC } from 'react';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ProfileRequest, ProfileValidator } from '@/lib/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import FileUpload from './FileUpload';
import { Textarea } from '@/components/ui/Textarea';

interface ProfileDetailsProps {
  profile: ProfileRequest;
  image: string;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({ profile, image }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileRequest>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      bio: profile.bio,
      picture: profile.picture,
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
        <FileUpload image={image} />
        <div className="md:flex items-center mt-6">
          <Label htmlFor="firstName" className="md:basis-2/5">
            Bio
          </Label>
          <Textarea
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
