import { db } from '@/lib/db';
import { UserValidator } from '@/lib/validators/user';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, confirmPassword } = UserValidator.parse(body);
  const hashed = await hash(password, 12);

  const emailTaken = await db.user.findFirst({
    where: { email },
  });

  if (emailTaken) return new Response('Email taken', { status: 409 });

  const user = await db.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  return NextResponse.json({
    user: {
      email: user.email,
    },
  });
}

// import { getAuthSession } from '@/lib/auth';
// import { db } from '@/lib/db';
// import { UserValidator } from '@/lib/validators/user';
// import { z } from 'zod';

// export async function POST(req: Request) {
//   try {
//     const session = await getAuthSession();
//     if (!session) return new Response('Unauthorized', { status: 401 });

//     const body = await req.json();
//     const { email, password, confirmPassword } = UserValidator.parse(body);

//     const usernameTaken = await db.user.findFirst({
//       where: { email },
//     });

//     if (usernameTaken) return new Response('Username taken', { status: 409 });

//     await db.user.update({
//       where: { id: session.user.id },
//       data: { username: name },
//     });

//     return new Response('OK', { status: 200 });
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return new Response('Invalid request data passed', { status: 422 });
//     }
//     return new Response('Could not update username, please try again later', {
//       status: 500,
//     });
//   }
// }
