import { trpc } from '@server/trpc';
import { random } from 'radash';
import { auth } from '../auth';

const procedure = trpc.procedure.use(auth);

export const gameRouter = trpc.router({
  get: procedure.query(async ({ ctx }) =>
    ctx.prisma.gameSession.upsert({
      create: {
        userId: ctx.session.user.id,
        rounds: {
          create: {
            coordinateId: random(1, await ctx.prisma.coordinate.count()),
          },
        },
      },
      update: {},
      where: { userId: ctx.session.user.id },
      select: {
        id: true,
        rounds: {
          select: {
            coordinate: { select: { lat: true, lng: true } },
          },
        },
      },
    }),
  ),
});
