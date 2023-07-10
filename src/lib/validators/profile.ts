import { z } from 'zod';

export const ProfileValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  bio: z.string().nullable(),
  picture: z.string().nullable(),
  email: z.string().email().nullable(),
});

export type ProfileRequest = z.infer<typeof ProfileValidator>;
