import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button isLoading>Loading</Button>
      <Button variant="outline">Preview</Button>
      <Button variant="outline" disabled>
        Preview
      </Button>
      <Button variant="outline" isLoading>
        Loading
      </Button>
    </>
  );
}
