'use client';
import { useSession } from 'next-auth/react';

const ClientSession = ({}) => {
  const { data: session } = useSession();
  console.log('client session', session);
  return <pre>{JSON.stringify(session)}</pre>;
};

export default ClientSession;
