import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { LinkValidator } from '@/lib/validators/link';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { url, order, platform } = LinkValidator.parse(body);

    // create link and associate it with the user
    const link = await db.link.create({
      data: {
        url,
        order,
        platform,
        userId: session.user.id,
      },
    });

    return new Response(link.url);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }

    return new Response('Could not create link', { status: 500 });
  }
}

export async function GET(req: Request) {
  console.log('GET', req);
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const links = await db.link.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return new Response(JSON.stringify(links), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Could not get links', { status: 500 });
  }
}
