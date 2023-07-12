import PreviewBackground from '@/components/PreviewBackground';
import PreviewCard from '@/components/PreviewCard';
import PreviewHeader from '@/components/PreviewHeader';

export default async function PreviewPage() {
  return (
    <div className="relative md:p-6 bg-white md:bg-gray-100 min-h-screen">
      <PreviewBackground />
      <PreviewHeader />
      <PreviewCard />
    </div>
  );
}
