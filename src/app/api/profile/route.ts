import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ProfileValidator } from '@/lib/validators/profile';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const profile = await db.profile.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(profile), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Could not get links', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) return new Response('Unauthorized', { status: 401 });

    const body = await req.json();
    const { firstName, lastName, email, bio, picture } =
      ProfileValidator.parse(body);

    await db.profile.update({
      where: { userId: session.user.id },
      data: { firstName, lastName, email, bio, picture },
    });

    return new Response('OK', { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }
    return new Response('Could not update username, please try again later', {
      status: 500,
    });
  }
}
