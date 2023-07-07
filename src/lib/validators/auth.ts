import { z } from 'zod';

export const SignUpValidator = z
  .object({
    email: z
      .string({
        required_error: "Can't be empty",
      })
      .email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type SignUpRequest = z.infer<typeof SignUpValidator>;

export const SignInValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInRequest = z.infer<typeof SignInValidator>;
