'use client';
import Link from 'next/link';
import { FC } from 'react';
import { Button, buttonVariants } from './ui/Button';

interface PreviewHeaderProps {}

const PreviewHeader: FC<PreviewHeaderProps> = ({}) => {
  const copyToClipboard = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
  };
  return (
    <header className="fixed inset-x-0 z-20 md:mx-6 bg-white rounded-b-xl p-4 flex items-center justify-between rounded-xl">
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: 'outline',
        })}
      >
        Back to Editor
      </Link>
      <Button variant="primary" type="button" onClick={copyToClipboard}>
        Share Link
      </Button>
    </header>
  );
};

export default PreviewHeader;
