import { getRandomCoordinate } from '@server/common/random-coordinate';
import { trpc } from '@server/trpc';
import { auth } from '../auth';

const procedure = trpc.procedure.use(auth);

export const gameRouter = trpc.router({
  get: procedure.query(async ({ ctx }) => {
    const { id, rounds } = await ctx.prisma.gameSession.upsert({
      create: {
        userId: ctx.session.user.id,
        rounds: {
          // This is dangerous, need to refactor
          create: { coordinateId: Number(await getRandomCoordinate(ctx)) },
        },
      },
      update: {},
      where: { userId: ctx.session.user.id },
      select: {
        id: true,
        rounds: {
          take: 1,
          select: { coordinate: { select: { pano: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return { id, pano: rounds[0]?.coordinate.pano };
  }),
});
