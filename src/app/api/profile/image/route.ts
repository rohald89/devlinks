import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ProfileImageValidator } from '@/lib/validators/profile';
import { utapi } from 'uploadthing/server';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) return new Response('Unauthorized', { status: 401 });

    const body = await req.json();
    const { picture } = ProfileImageValidator.parse(body);

    // Delete current image from UploadThing
    const currentImage = await db.profile.findFirst({
      where: { userId: session.user.id },
      select: { picture: true },
    });

    if (currentImage?.picture) {
      await utapi.deleteFiles(currentImage.picture);
    }

    // Update profile with new image
    await db.profile.update({
      where: { userId: session.user.id },
      data: { picture },
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
