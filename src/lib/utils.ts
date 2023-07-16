import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PlatformType } from '@prisma/client';
import { PlatformIcons } from '@/components/Icons';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlatform(platform: PlatformType) {
  const platformLookup = {
    GITHUB: {
      icon: <PlatformIcons.github />,
      name: 'GitHub',
      color: '#000',
    },
    FRONTENDMENTOR: {
      icon: <PlatformIcons.fem />,
      name: 'Frontend Mentor',
      color: '#fff',
    },
    TWITTER: {
      icon: <PlatformIcons.twitter />,
      name: 'Twitter',
      color: '#43B7E9',
    },
    LINKEDIN: {
      icon: <PlatformIcons.linkedin />,
      name: 'LinkedIn',
      color: '#2D68FF',
    },
    YOUTUBE: {
      icon: <PlatformIcons.youtube />,
      name: 'YouTube',
      color: '#EE3939',
    },
    FACEBOOK: {
      icon: <PlatformIcons.facebook />,
      name: 'Facebook',
      color: '#2442AC',
    },
    TWITCH: {
      icon: <PlatformIcons.twitch />,
      name: 'Twitch',
      color: '#EE3FC8',
    },
    DEV: {
      icon: <PlatformIcons.dev />,
      name: 'Dev.to',
      color: '#333',
    },
    CODEWARS: {
      icon: <PlatformIcons.codewars />,
      name: 'Codewars',
      color: '#B90000',
    },
    CODEPEN: {
      icon: <PlatformIcons.codepen />,
      name: 'CodePen',
      color: '#000',
    },
    FREECODECAMP: {
      icon: <PlatformIcons.fcc />,
      name: 'freeCodeCamp',
      color: '#0A0A23',
    },
    GITLAB: {
      icon: <PlatformIcons.gitlab />,
      name: 'GitLab',
      color: '#FCA121',
    },
    HASHNODE: {
      icon: <PlatformIcons.hashnode />,
      name: 'Hashnode',
      color: '#2962FF',
    },
    STACKOVERFLOW: {
      icon: <PlatformIcons.stackoverflow />,
      name: 'Stack Overflow',
      color: '#F48024',
    },
    INSTAGRAM: {
      icon: <PlatformIcons.instagram />,
      name: 'Instagram',
      color: '#E1306C',
    },
    TREEHOUSE: {
      icon: <PlatformIcons.treehouse />,
      name: 'Treehouse',
      color: '#52C86D',
    },
  };

  return platformLookup[platform];
}
