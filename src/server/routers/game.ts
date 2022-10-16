import { getRandomCoordinate } from '@server/common/random-coordinate';
import { trpc } from '@server/trpc';
import { z } from 'zod';
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
          select: { coordinate: { select: { pano: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return { id, pano: rounds[0]?.coordinate.pano, round: rounds.length };
  }),
  guess: procedure
    .input(z.object({ lat: z.number(), lng: z.number() }))
    .mutation(async ({ ctx, input: { lat, lng } }) => {
      const game = await ctx.prisma.gameSession.findUnique({
        where: { userId: ctx.session.user.id },
        select: { rounds: { select: { coordinate: true } } },
      });

      const coordinate = game?.rounds?.[0]?.coordinate;
      if (!coordinate) return null;

      const target = { lat: coordinate.lat, lng: coordinate.lng };

      return { marker: target };
    }),
});
