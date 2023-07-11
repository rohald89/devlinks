import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { getPlatform } from '@/lib/utils';
import { PlatformType } from '@prisma/client';

interface PlatformSelectProps {
  value: PlatformType;
  onValueChange: (value: PlatformType) => void;
}

const PlatformSelect: FC<PlatformSelectProps> = ({ value, onValueChange }) => {
  // const { onChange, onBlur, name, ref } = register('firstName');
  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Platform" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(PlatformType).map((platform) => {
          const { icon, name } = getPlatform(platform as PlatformType);
          return (
            <SelectItem key={platform} value={platform}>
              <span className="flex items-center gap-2">
                {icon} {name}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default PlatformSelect;
