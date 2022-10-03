import { auth } from '@server/auth';
import { trpc } from '../trpc';

export const sessionRouter = trpc.router({
  getUser: trpc.procedure.use(auth).query(async ({ ctx }) =>
    ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { name: true, email: true, image: true },
    }),
  ),
});
