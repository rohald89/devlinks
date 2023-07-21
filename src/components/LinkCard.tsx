import { cn } from '@/lib/utils';
import { Link as LinkType, PlatformType } from '@prisma/client';
import { FC } from 'react';
import { Icons, PlatformIcons } from './Icons';
import Link from 'next/link';

interface LinkCardProps {
  link: LinkType;
  size?: 'sm' | 'md';
}

export function getPlatform(
  platform: PlatformType,
  options: { size: 'sm' | 'md' } = { size: 'md' }
) {
  const sizeLookup = {
    sm: 16,
    md: 20,
  };
  const platformLookup = {
    GITHUB: {
      icon: (
        <PlatformIcons.github
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'GitHub',
      color: '#000',
    },
    FRONTENDMENTOR: {
      icon: (
        <PlatformIcons.fem
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Frontend Mentor',
      color: '#fff',
    },
    TWITTER: {
      icon: (
        <PlatformIcons.twitter
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Twitter',
      color: '#43B7E9',
    },
    LINKEDIN: {
      icon: (
        <PlatformIcons.linkedin
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'LinkedIn',
      color: '#2D68FF',
    },
    YOUTUBE: {
      icon: (
        <PlatformIcons.youtube
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'YouTube',
      color: '#EE3939',
    },
    FACEBOOK: {
      icon: (
        <PlatformIcons.facebook
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Facebook',
      color: '#2442AC',
    },
    TWITCH: {
      icon: (
        <PlatformIcons.twitch
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Twitch',
      color: '#EE3FC8',
    },
    DEV: {
      icon: (
        <PlatformIcons.dev
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Dev.to',
      color: '#333',
    },
    CODEWARS: {
      icon: (
        <PlatformIcons.codewars
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Codewars',
      color: '#B90000',
    },
    CODEPEN: {
      icon: (
        <PlatformIcons.codepen
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'CodePen',
      color: '#000',
    },
    FREECODECAMP: {
      icon: (
        <PlatformIcons.fcc
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'freeCodeCamp',
      color: '#0A0A23',
    },
    GITLAB: {
      icon: (
        <PlatformIcons.gitlab
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'GitLab',
      color: '#FCA121',
    },
    HASHNODE: {
      icon: (
        <PlatformIcons.hashnode
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Hashnode',
      color: '#2962FF',
    },
    STACKOVERFLOW: {
      icon: (
        <PlatformIcons.stackoverflow
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Stack Overflow',
      color: '#F48024',
    },
    INSTAGRAM: {
      icon: (
        <PlatformIcons.instagram
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Instagram',
      color: '#E1306C',
    },
    TREEHOUSE: {
      icon: (
        <PlatformIcons.treehouse
          width={sizeLookup[options.size]}
          height={sizeLookup[options.size]}
        />
      ),
      name: 'Treehouse',
      color: '#52C86D',
    },
  };

  return platformLookup[platform];
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
