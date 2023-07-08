'use client';

import type { FC } from 'react';
import type { Link } from '@prisma/client';

import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

import PlatformSelect from '@/components/PlatformSelect';
import { Icons } from '@/components/Icons';

interface LinkInputProps {
  link: Link;
  index: number;
}

const LinkInput: FC<LinkInputProps> = ({ link, index }) => {
  return (
    <div className="p-5 rounded-xl bg-background text-gray-500">
      <div className="flex items-center gap-2 ">
        <Icons.drag />
        <h2 className="flex-1 text-heading-sm">Link #{index + 1}</h2>
        <p className="text-body-md">Remove</p>
      </div>
      <Label htmlFor="firstName">Platform</Label>
      <PlatformSelect value={link.platform} />

      <Label htmlFor="link">Link</Label>
      <Input
        icon="link"
        type="text"
        id="link"
        value={link.url}
        onChange={() => {}}
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
    </div>
  );
};

export default LinkInput;
