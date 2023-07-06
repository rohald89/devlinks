import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <Button>Share Link</Button>
      <Button disabled>Share Link</Button>
      <Button variant="outline">Preview</Button>
      <Button variant="outline" disabled>
        Preview
      </Button>
    </>
  );
}
