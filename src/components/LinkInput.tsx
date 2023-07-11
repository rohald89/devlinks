'use client';

import type { FC } from 'react';
import type { Link } from '@prisma/client';

import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

import PlatformSelect from '@/components/PlatformSelect';
import { Icons } from '@/components/Icons';
import { Controller } from 'react-hook-form';

interface LinkInputProps {
  link: Link;
  index: number;
  //   TODO Type this
  register: any;
  remove: any;
  control: any;
}

const LinkInput: FC<LinkInputProps> = ({
  link,
  index,
  register,
  errors,
  remove,
  control,
}) => {
  return (
    <div className="p-5 rounded-xl bg-background text-gray-500">
      <div className="flex items-center gap-2 ">
        <Icons.drag />
        <h2 className="flex-1 text-heading-sm">Link #{index + 1}</h2>
        <button
          type="button"
          className="text-body-md"
          onClick={() => remove(index)}
        >
          Remove
        </button>
      </div>
      <Label htmlFor="firstName">Platform</Label>

      <Controller
        name={`links.${index}.platform`}
        control={control}
        render={({ field }) => (
          <PlatformSelect
            value={link.platform}
            onValueChange={field.onChange}
          />
        )}
      />

      <Label htmlFor="link">Link</Label>
      <Input
        icon="link"
        type="text"
        id="link"
        {...register(`links.${index}.url`)}
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
    </div>
  );
};

export default LinkInput;
