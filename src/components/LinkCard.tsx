import { cn, getPlatform } from '@/lib/utils';
import { Link as LinkType } from '@prisma/client';
import { FC } from 'react';
import { Icons } from './Icons';
import Link from 'next/link';

interface LinkCardProps {
  link: LinkType;
  size?: 'sm' | 'md';
}

const LinkCard: FC<LinkCardProps> = ({ link, size = 'md' }) => {
  const platform = getPlatform(link.platform, { size });
  return (
    <Link
      href={link.url}
      style={{ backgroundColor: platform.color }}
      className={cn(
        size === 'sm' ? 'py-[13px]' : 'py-4',
        'flex items-center gap-2 text-white px-4 rounded-lg w-[237px]'
      )}
    >
      {platform.icon}
      <p
        className={cn(
          size === 'sm' ? 'text-body-sm' : 'text-body-md',
          'flex-1'
        )}
      >
        {platform.name}
      </p>
      <Icons.rightArrow />
    </Link>
  );
};

export default LinkCard;
