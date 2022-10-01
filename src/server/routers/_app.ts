import { trpc } from '../trpc';
import { coordinatesRouter } from './coordinates';

export type AppRouter = typeof router;

export const router = trpc.router({
  coordinates: coordinatesRouter,
});
