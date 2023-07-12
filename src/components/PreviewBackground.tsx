import { FC } from 'react';

interface PreviewBackgroundProps {}

const PreviewBackground: FC<PreviewBackgroundProps> = ({}) => {
  return (
    <div className="hidden md:block absolute z-10 top-0 right-0 left-0 md:h-[360px] md:bg-primary-600 rounded-b-[32px]"></div>
  );
};

export default PreviewBackground;
