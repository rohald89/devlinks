import { getAuthSession } from '@/lib/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: '1MB' } })
    .middleware(async () => {
      const session = await getAuthSession();
      if (!session?.user) {
        throw new Error('Unauthorized');
      }

      return { userId: session?.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userID:', metadata.userId);
      console.log('File url', file.url);
    }),
} satisfies FileRouter;

export type fileRouter = typeof fileRouter;
