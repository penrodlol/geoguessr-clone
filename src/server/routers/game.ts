import { trpc } from '@server/trpc';
import { random } from 'radash';
import { auth } from '../auth';

const prodected = trpc.procedure.use(auth);

export const gameRouter = trpc.router({
  getActive: prodected.query(async ({ ctx }) =>
    ctx.prisma.gameSession.findFirst({
      where: { userId: ctx.session.user.id, completed: false },
    }),
  ),
  createGame: prodected.mutation(async ({ ctx }) => {
    const coordinateId = random(1, await ctx.prisma.coordinate.count());

    return ctx.prisma.gameSession.create({
      data: {
        userId: ctx.session.user.id,
        gameRounds: { create: { coordinateId } },
      },
    });
  }),
});
