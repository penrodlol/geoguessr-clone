import { trpc } from '../trpc';
import { gameRouter } from './game';
import { sessionRouter } from './session';

export type AppRouter = typeof router;

export const router = trpc.router({
  game: gameRouter,
  session: sessionRouter,
});
