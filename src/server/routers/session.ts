import { trpc } from '../trpc';

export const sessionRouter = trpc.router({
  getUser: trpc.procedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) return null;

    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { name: true, email: true, image: true },
    });
  }),
});
