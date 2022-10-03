import { authOptions as nextAuthOptions } from '@pages/api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';

type Req = GetServerSidePropsContext['req'];
type Res = GetServerSidePropsContext['res'];

export const getSession = async (ctx: { req: Req; res: Res }) => {
  return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
