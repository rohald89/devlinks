import { db } from '@/lib/db';
import { UserValidator } from '@/lib/validators/user';
import { hash } from 'bcrypt';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = UserValidator.parse(body);
    const hashed = await hash(password, 12);

    const emailTaken = await db.user.findFirst({
      where: { email },
    });

    if (emailTaken) return new Response('Email taken', { status: 409 });

    await db.user.create({
      data: {
        email,
        password: hashed,
      },
    });

    return new Response('OK', { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }
    return new Response('Could not create user, please try again later', {
      status: 500,
    });
  }
}
