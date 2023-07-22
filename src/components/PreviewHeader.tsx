'use client';
import Link from 'next/link';
import { FC } from 'react';
import { Button, buttonVariants } from './ui/Button';
import { toast } from '@/hooks/use-toast';

interface PreviewHeaderProps {
  userId: string;
}

const PreviewHeader: FC<PreviewHeaderProps> = ({ userId }) => {
  const copyToClipboard = async () => {
    const url = window.location.href.replace('/preview', `/${userId}`);
    console.log(url);
    // copy the URL to the clipboard

    await navigator.clipboard.writeText(url);
    toast({
      title: 'The link has been copied to your clipboard!',
    });
  };
  return (
    <header className="fixed inset-x-0 z-20 md:mx-6 bg-white dark:bg-slate-900 rounded-b-xl p-4 flex items-center justify-between md:rounded-xl">
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
