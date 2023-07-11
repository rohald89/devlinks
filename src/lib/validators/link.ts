import { z } from 'zod';

export const LinkValidator = z.object({
  url: z.string().url(),
  platform: z.enum([
    'GITHUB',
    'TREEHOUSE',
    'FRONTENDMENTOR',
    'TWITTER',
    'LINKEDIN',
    'YOUTUBE',
    'FACEBOOK',
    'INSTAGRAM',
    'TWITCH',
    'DEV',
    'CODEWARS',
    'CODEPEN',
    'FREECODECAMP',
    'GITLAB',
    'HASHNODE',
    'STACKOVERFLOW',
  ]),
  order: z.number().int().positive(),
});

export type CreateLinkPayload = z.infer<typeof LinkValidator>;

export const UpdateLinkValidator = z.object({
  links: z.array(LinkValidator),
});

export type UpdateLinkPayload = z.infer<typeof UpdateLinkValidator>;
