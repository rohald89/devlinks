import { FC } from 'react';
import { Icons } from './Icons';

interface PreviewProps {}

const Preview: FC<PreviewProps> = ({}) => {
  return (
    <div className="hidden p-32 rounded-xl xl:flex items-center justify-center bg-white">
      <Icons.mockup className="w-full h-full" />
    </div>
  );
};

export default Preview;
