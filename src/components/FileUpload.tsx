'use client';
import { useUploadThing } from '@/lib/uploadthing';
import { FC, useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Icons } from './Icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  image: string;
}

const FileUpload: FC<FileUploadProps> = ({ image }) => {
  // TODO Manage initial state
  const [profileImage, setProfileImage] = useState<string>(image || '');

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (!acceptedFiles.length) return;
    startUpload([acceptedFiles[0]]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: (file) => {
      if (!file?.length) return;
      updateProfileImage(file[0].fileKey);
      setProfileImage(file[0].fileUrl);
    },
    onUploadError: () => {
      // TODO - handle error
    },
  });

  const { mutate: updateProfileImage } = useMutation({
    mutationFn: async (key: string) => {
      const payload = {
        picture: key,
      };
      const { data } = await axios.patch('api/profile/image', payload);
      return data;
    },
  });

  return (
    <div className="md:flex md:items-center">
      <p className="text-body-md mb-4 text-gray-500 dark:text-slate-200 md:basis-2/5">
        Profile Picture
      </p>
      <div className="basis-3/5 md:flex md:items-center">
        <div
          style={{ '--image-url': `url(${profileImage})` }}
          className={cn(
            !!profileImage ? 'text-white' : 'text-primary-600',
            'bg-[image:var(--image-url)] bg-cover rounded-xl'
          )}
        >
          <div
            {...getRootProps()}
            className={cn(
              !!profileImage ? 'backdrop-brightness-50' : 'bg-primary-100 ',
              'cursor-pointer text-heading-sm  px-10 py-16 rounded-xl flex flex-col items-center gap-2 justify-center aspect-square md:min-w-[200px] w-[200px]'
            )}
          >
            <input {...getInputProps()} />
            <Icons.image />+ Upload Image
          </div>
        </div>
        <p className="text-body-sm text-gray-500 dark:text-slate-200 mt-6 md:mt-0 md:ml-6">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
