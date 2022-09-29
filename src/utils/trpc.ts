import { AppRouter } from '@server/routers/_app';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

export const trpc = createTRPCNext<AppRouter>({
  ssr: false,
  config: () => ({ links: [httpBatchLink({ url: '/api/trpc' })] }),
});
