import type { AppRouter } from '@server/routers/_app';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { inferProcedureOutput as O } from '@trpc/server';
import transformer from 'superjson';

type RGame = AppRouter['game'];
type RSession = AppRouter['session'];

export type QGame<K extends keyof AppRouter['game']> = O<RGame[K]>;
export type QSession<K extends keyof AppRouter['session']> = O<RSession[K]>;

export const trpc = createTRPCNext<AppRouter>({
  ssr: false,
  config: () => ({ transformer, links: [httpBatchLink({ url: '/api/trpc' })] }),
});
