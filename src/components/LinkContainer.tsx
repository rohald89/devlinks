'use client';
import { FC } from 'react';
import GetStarted from './GetStarted';
import LinkInput from './LinkInput';
import { Link } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface LinkContainerProps {}

const LinkContainer: FC<LinkContainerProps> = ({}) => {
  const tempLinks: Link[] = [
    {
      id: '1',
      url: 'https://twitter.com/xxxxxxxxx',
      order: 1,
      platform: 'TWITTER',
      userId: '1',
    },
    {
      id: '2',
      url: 'https://github.com/xxxxxxxxx',
      order: 1,
      platform: 'GITHUB',
      userId: '1',
    },
  ];

  const { data: links, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      console.log('queryFn');
      const { data } = await axios.get('/api/link');
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className="mt-6 space-y-6">
        {links.map((link, i) => (
          <LinkInput index={i} key={link.id} link={link} />
        ))}
      </div>
      {/* When no links are found show GetStarted */}
      {tempLinks.length === 0 && <GetStarted />}
    </>
  );
};

export default LinkContainer;
