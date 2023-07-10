'use client';
import { FC } from 'react';
import GetStarted from './GetStarted';
import LinkInput from './LinkInput';
import { Link } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface LinkContainerProps {}

const LinkContainer: FC<LinkContainerProps> = ({}) => {
  const { data: links, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const { data } = await axios.get('/api/link');
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
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
