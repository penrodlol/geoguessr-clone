import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions as NextContextOpts } from '@trpc/server/adapters/next';
import { getServerSession } from './common/server-session';
import { prisma } from './db/prisma';

export type ContextOpts = NextContextOpts;
export type Context = inferAsyncReturnType<typeof ctx>;

export const ctx = async ({ req, res }: ContextOpts) => {
  const session = await getServerSession({ req, res });
  return { req, res, session, prisma };
};
