import type { AppRouter } from '@server/routers/_app';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import transformer from 'superjson';

export const trpc = createTRPCNext<AppRouter>({
  ssr: false,
  config: () => ({ transformer, links: [httpBatchLink({ url: '/api/trpc' })] }),
});
