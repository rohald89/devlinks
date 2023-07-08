'use client';

import { toast } from '@/hooks/use-toast';
import { CreateLinkPayload } from '@/lib/validators/link';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from './ui/Button';

interface CreateLinkProps {}

const CreateLink: FC<CreateLinkProps> = ({}) => {
  const router = useRouter();

  const { mutate: createLink, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateLinkPayload = {
        url: 'https://example.com',
        platform: 'GITHUB',
        order: 1,
      };

      const res = await axios.post('/api/link', payload);
      console.log(res);
      return res.data as string;
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid link',
            description: 'Please try again with a different link.',
          });
        }

        if (err.response?.status === 401) {
          return toast({
            title: 'Unauthorized',
            description: 'You must be logged in to perform this action.',
          });
        }
      }
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
      });
    },
    onSuccess: (data) => {
      router.refresh();
      toast({
        title: 'Link created',
        description: 'Your link has been created.',
      });
    },
  });

  return (
    <Button
      variant="outline"
      className="w-full mt-10"
      isLoading={isLoading}
      disabled={isLoading}
      onClick={() => createLink()}
    >
      + Add new Link
    </Button>
  );
};

export default CreateLink;
