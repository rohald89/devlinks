import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PlatformType } from '@prisma/client';
import { PlatformIcons } from '@/components/Icons';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlatform(platform: PlatformType, { size = 16 } = {}) {
  const platformLookup = {
    GITHUB: {
      icon: <PlatformIcons.github width={size} height={size} />,
      name: 'GitHub',
      color: '#000',
    },
    FRONTENDMENTOR: {
      icon: <PlatformIcons.fem width={size} height={size} />,
      name: 'Frontend Mentor',
      color: '#fff',
    },
    TWITTER: {
      icon: <PlatformIcons.twitter width={size} height={size} />,
      name: 'Twitter',
      color: '#43B7E9',
    },
    LINKEDIN: {
      icon: <PlatformIcons.linkedin width={size} height={size} />,
      name: 'LinkedIn',
      color: '#2D68FF',
    },
    YOUTUBE: {
      icon: <PlatformIcons.youtube width={size} height={size} />,
      name: 'YouTube',
      color: '#EE3939',
    },
    FACEBOOK: {
      icon: <PlatformIcons.facebook width={size} height={size} />,
      name: 'Facebook',
      color: '#2442AC',
    },
    TWITCH: {
      icon: <PlatformIcons.twitch width={size} height={size} />,
      name: 'Twitch',
      color: '#EE3FC8',
    },
    DEV: {
      icon: <PlatformIcons.dev width={size} height={size} />,
      name: 'Dev.to',
      color: '#333',
    },
    CODEWARS: {
      icon: <PlatformIcons.codewars width={size} height={size} />,
      name: 'Codewars',
      color: '#B90000',
    },
    CODEPEN: {
      icon: <PlatformIcons.codepen width={size} height={size} />,
      name: 'CodePen',
      color: '#000',
    },
    FREECODECAMP: {
      icon: <PlatformIcons.fcc width={size} height={size} />,
      name: 'freeCodeCamp',
      color: '#0A0A23',
    },
    GITLAB: {
      icon: <PlatformIcons.gitlab width={size} height={size} />,
      name: 'GitLab',
      color: '#FCA121',
    },
    HASHNODE: {
      icon: <PlatformIcons.hashnode width={size} height={size} />,
      name: 'Hashnode',
      color: '#2962FF',
    },
    STACKOVERFLOW: {
      icon: <PlatformIcons.stackoverflow width={size} height={size} />,
      name: 'Stack Overflow',
      color: '#F48024',
    },
    INSTAGRAM: {
      icon: <PlatformIcons.instagram width={size} height={size} />,
      name: 'Instagram',
      color: '#E1306C',
    },
    TREEHOUSE: {
      icon: <PlatformIcons.treehouse width={size} height={size} />,
      name: 'Treehouse',
      color: '#000',
    },
  };

  return platformLookup[platform];
}
