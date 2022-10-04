import { authOptions } from '@pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import { GetServerSidePropsContext as SSROpts } from 'next/types';
import { ContextOpts as _ContextOpts } from '../context';

type ContextOpts = _ContextOpts | Pick<SSROpts, 'req' | 'res'>;

export const getServerSession = async ({ req, res }: ContextOpts) =>
  unstable_getServerSession(req, res, authOptions);
