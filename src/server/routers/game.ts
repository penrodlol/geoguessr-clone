import { trpc } from '@server/trpc';
import { z } from 'zod';
import { auth } from '../auth';
import { getRandomCoordinate } from '../common/random-coordinate';

const procedure = trpc.procedure.use(auth);

export const gameRouter = trpc.router({
  get: procedure.query(async ({ ctx }) => {
    const coordinateId = await getRandomCoordinate(ctx);

    if (!coordinateId) return null;

    return ctx.prisma.gameSession.upsert({
      create: {
        userId: ctx.session.user.id,
        rounds: { create: { coordinateId } },
      },
      update: {},
      where: { userId: ctx.session.user.id },
      select: {
        id: true,
        rounds: {
          select: {
            coordinate: { select: { pano: true, lat: true, lng: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }),
  createNextRound: procedure
    .input(z.number().int().positive())
    .mutation(async ({ ctx, input: gameSessionId }) => {
      const coordinateId = await getRandomCoordinate(ctx);

      if (!coordinateId) return null;

      return ctx.prisma.gameRound.create({
        data: { gameSessionId, coordinateId },
        select: {
          coordinate: { select: { pano: true, lat: true, lng: true } },
        },
      });
    }),
});
