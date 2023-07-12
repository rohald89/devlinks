import { useUploadThing } from '@/lib/uploadthing';
import { FC, useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Icons } from './Icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface FileUploadProps {}

const FileUpload: FC<FileUploadProps> = ({}) => {
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
      // console.log(file);
      if (!file?.length) return;
      updateProfileImage(file[0].fileKey);
    },
    onUploadError: () => {
      console.log('error');
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
      <p className="text-body-md mb-4 text-gray-500 md:basis-2/5">
        Profile Picture
      </p>
      <div className="basis-3/5 md:flex md:items-center">
        <div
          {...getRootProps()}
          className="bg-primary-100 text-heading-sm text-primary-600 px-10 py-16 rounded-xl flex flex-col items-center gap-2 justify-center aspect-square md:min-w-[200px] w-[200px]"
        >
          <input {...getInputProps()} />
          <div>
            {/* {files.length > 0 && (
              <button type="button" onClick={() => startUpload(files)}>
                Upload {files.length} files
              </button>
            )} */}
          </div>
          <Icons.image />+ Upload Image
        </div>
        <p className="text-body-sm text-gray-500 mt-6 md:mt-0 md:ml-6">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
