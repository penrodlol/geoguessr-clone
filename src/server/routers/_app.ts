import { trpc } from '../trpc';
import { coordinateRouter } from './coordinate';

export type AppRouter = typeof router;

export const router = trpc.router({
  coordinate: coordinateRouter,
});
