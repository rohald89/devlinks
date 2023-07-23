'use client';

import { FC, useCallback } from 'react';
import GetStarted from './GetStarted';
import LinkInput from './LinkInput';
import { Link } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UpdateLinkPayload, UpdateLinkValidator } from '@/lib/validators/link';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface LinkContainerProps {
  links: Link[];
}

const LinkContainer: FC<LinkContainerProps> = ({ links }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<UpdateLinkPayload>({
    resolver: zodResolver(UpdateLinkValidator),
    defaultValues: {
      links,
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

  const moveLink = useCallback((dragIndex: number, hoverIndex: number) => {
    // change the order of the links locally first
    const reorderedLinks = [...links];
    const dragLink = reorderedLinks[dragIndex];
    reorderedLinks.splice(dragIndex, 1);
    reorderedLinks.splice(hoverIndex, 0, dragLink);
    console.log(reorderedLinks[1]);
    updateLinks({ links: reorderedLinks });
  }, []);

  const renderLink = useCallback((link: Link, index: number) => {
    return (
      <LinkInput
        key={link.id}
        index={index}
        register={register}
        errors={errors}
        control={control}
        link={link}
        error={errors?.links?.[index]?.url.message}
        remove={remove}
        move={moveLink}
      />
    );
  }, []);

  //   if (!links?.length) return <GetStarted />;
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
      {!links?.length ? (
        <GetStarted />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <form
            className="mt-6 relative overflow-y-scroll max-h-[800px] space-y-6 scrollbar-thumb-primary-600 scrollbar-thin round"
            id="editLinks"
            onSubmit={handleSubmit((e) => {
              updateLinks(e);
            })}
          >
            {fields.map((link, i) => renderLink(link, i))}
          </form>
        </DndProvider>
      )}
    </>
  );
};

export default LinkContainer;
