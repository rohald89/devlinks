import LinkInput from './LinkInput';
import GetStarted from './GetStarted';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { Link } from '@prisma/client';

interface LinkContainerProps {}
const LinkContainer = async ({}: LinkContainerProps) => {
  const session = await getAuthSession();

  const links = await db.link.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  if (!links?.length) return <GetStarted />;

  return (
    <>
      <div className="mt-6 space-y-6">
        {links.map((link: Link, i: number) => (
          <LinkInput index={i} key={link.id} link={link} />
        ))}
      </div>
    </>
  );
};

export default LinkContainer;
