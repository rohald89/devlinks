import { z } from 'zod';

export const ProfileValidator = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "Can't be empty",
    })
    .max(50),
  lastName: z
    .string()
    .min(2, {
      message: "Can't be empty",
    })
    .max(50),
  bio: z.string().nullable(),
  picture: z.string().nullable(),
  email: z.string().email().nullable(),
});

export type ProfileRequest = z.infer<typeof ProfileValidator>;

export const ProfileImageValidator = z.object({
  picture: z.string(),
});

export type ProfileImageRequest = z.infer<typeof ProfileImageValidator>;
