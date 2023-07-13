'use client';

import { FC } from 'react';
import GetStarted from './GetStarted';
import LinkInput from './LinkInput';
import { Link } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UpdateLinkPayload, UpdateLinkValidator } from '@/lib/validators/link';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

interface LinkContainerProps {
  links: Link[];
}

const LinkContainer: FC<LinkContainerProps> = ({ links }) => {
  const router = useRouter();
  const initialLinks = links.map((link) => ({
    url: link.url,
    platform: link.platform,
    order: link.order,
  }));
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<UpdateLinkPayload>({
    resolver: zodResolver(UpdateLinkValidator),
    defaultValues: {
      links: initialLinks,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const { mutate: updateLinks, isLoading } = useMutation({
    mutationFn: async (links: UpdateLinkPayload) => {
      const payload: UpdateLinkPayload = {
        links: links.links.map((link) => ({
          url: link.url,
          platform: link.platform,
          order: link.order,
        })),
      };
      const { data } = await axios.patch('api/link', payload);
      return data;
    },
    onError: (err) => {
      // TODO - handle error
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  if (!links?.length) return <GetStarted />;
  return (
    <>
      <Button
        variant="outline"
        className="w-full mt-10"
        onClick={() =>
          append({
            url: '',
            platform: 'GITHUB',
            order: links.length,
          })
        }
      >
        + Add new Link
      </Button>
      <form
        className="mt-6 space-y-6 max-h-[600px] overflow-y-scroll"
        id="editLinks"
        onSubmit={handleSubmit((e) => {
          updateLinks(e);
        })}
      >
        {fields.map((item, index) => (
          <LinkInput
            key={item.id}
            index={index}
            register={register}
            errors={errors}
            control={control}
            link={item}
            error={errors?.links?.[index]?.url.message}
            remove={remove}
          />
        ))}
      </form>
    </>
  );
};

export default LinkContainer;
