import { authOptions } from '@pages/api/auth/[...nextauth]';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions as NextContextOpts } from '@trpc/server/adapters/next';
import { Session, unstable_getServerSession } from 'next-auth';
import { prisma } from './db/prisma';

export type ContextOpts = NextContextOpts & { session: Session | null };
export type Context = inferAsyncReturnType<typeof ctx>;

export const ctx = async ({ req, res }: ContextOpts) => ({
  req,
  res,
  prisma,
  session: await unstable_getServerSession(req, res, authOptions),
});
