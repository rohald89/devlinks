import { useUploadThing } from '@/lib/uploadthing';
import { FC, useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { generateClientDropzoneAccept } from 'uploadthing/client';

interface FileUploadProps {}

const FileUpload: FC<FileUploadProps> = ({}) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: (file) => {
      console.log(file);
    },
    onUploadError: () => {
      console.log('error');
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        {files.length > 0 && (
          <button type="button" onClick={() => startUpload(files)}>
            Upload {files.length} files
          </button>
        )}
      </div>
      Drop files here!
    </div>
  );
};

export default FileUpload;
