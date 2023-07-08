import { FC } from 'react';
import { Icons } from './Icons';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import PlatformSelect from './PlatformSelect';

interface LinkInputProps {}

const LinkInput: FC<LinkInputProps> = ({}) => {
  return (
    <div className="p-5 rounded-xl bg-background text-gray-500">
      <div className="flex items-center gap-2 ">
        <Icons.drag />
        <h2 className="flex-1 text-heading-sm">Link #1</h2>
        <p className="text-body-md">Remove</p>
      </div>
      <Label htmlFor="firstName">Platform</Label>
      <PlatformSelect />

      <Label htmlFor="link">Link</Label>
      <Input
        icon="link"
        type="text"
        id="link"
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
    </div>
  );
};

export default LinkInput;
