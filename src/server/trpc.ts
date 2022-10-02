import { initTRPC } from '@trpc/server';
import transformer from 'superjson';
import { Context } from './context';

export const trpc = initTRPC.context<Context>().create({ transformer });
