import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions as NextContextOpts } from '@trpc/server/adapters/next';
import { Session } from 'next-auth';
import { getSession } from './common/get-session';
import { prisma } from './db/prisma';

export type ContextOpts = NextContextOpts & { session: Session | null };
export type Context = inferAsyncReturnType<typeof ctx>;

export const ctx = async ({ req, res }: ContextOpts) => ({
  req,
  res,
  prisma,
  session: await getSession({ req, res }),
});
