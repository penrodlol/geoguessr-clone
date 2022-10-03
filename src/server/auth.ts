import { TRPCError } from '@trpc/server';
import { trpc } from './trpc';

export const auth = trpc.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({
    ctx: { ...ctx, session: { ...ctx.session, user: ctx.session.user } },
  });
});
