import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export type ContextOpts = trpcNext.CreateNextContextOptions;
export type Context = trpc.inferAsyncReturnType<typeof ctx>;

export const ctx = async (opts?: ContextOpts) => ({
  req: opts?.req,
  res: opts?.res,
});