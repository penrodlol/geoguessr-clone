import { ctx as createContext } from '@server/context';
import { router } from '@server/routers/_app';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({ router, createContext });
