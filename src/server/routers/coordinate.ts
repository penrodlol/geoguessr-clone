import { trpc } from '../trpc';

export const coordinateRouter = trpc.router({
  getRandom: trpc.procedure.query(async ({ ctx }) => {
    const total = await ctx.prisma.coordinate.count();
    const id = Math.floor(Math.random() * (total - 1) + 1);

    return ctx.prisma.coordinate.findFirst({ where: { id } });
  }),
});
