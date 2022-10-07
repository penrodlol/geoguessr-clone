import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions as NextContextOpts } from '@trpc/server/adapters/next';
import { Session } from 'next-auth';
import { getServerSession } from './common/server-session';
import { prisma } from './db/prisma';

export type ContextInnerOpts = { session: Session | null };
export type ContextOpts = NextContextOpts;
export type Context = inferAsyncReturnType<typeof ctx>;

export const ctxInner = async (opts: ContextInnerOpts) => ({
  session: opts.session,
  prisma,
});

export const ctx = async ({ req, res }: ContextOpts) => {
  const session = await getServerSession({ req, res });
  return ctxInner({ session });
};
