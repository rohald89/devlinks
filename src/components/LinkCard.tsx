import { getPlatform } from '@/lib/utils';
import { Link as LinkType } from '@prisma/client';
import { FC } from 'react';
import { Icons } from './Icons';
import Link from 'next/link';

interface LinkCardProps {
  link: LinkType;
}

const LinkCard: FC<LinkCardProps> = ({ link }) => {
  const platform = getPlatform(link.platform, { size: 20 });
  console.log(platform);
  return (
    <Link
      href={link.url}
      style={{ backgroundColor: platform.color }}
      className="flex items-center gap-2 text-white p-4 rounded-lg w-[237px]"
    >
      {platform.icon}
      <p className="flex-1">{platform.name}</p>
      <Icons.rightArrow />
    </Link>
  );
};

export default LinkCard;
