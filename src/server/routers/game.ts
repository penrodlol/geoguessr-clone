import { trpc } from '@server/trpc';
import { auth } from '../auth';

export const gameRouter = trpc.router({
  getNew: trpc.procedure.use(auth).query(async ({ ctx }) => {
    const total = await ctx.prisma.coordinate.count();
    const id = Math.floor(Math.random() * (total - 1) + 1);

    return ctx.prisma.coordinate.findUnique({
      where: { id },
      select: { lat: true, lng: true },
    });
  }),
});
