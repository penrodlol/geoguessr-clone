// @ts-check
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
});

const env = schema.safeParse(process.env);

if (!env.success) process.exit(0);

export default env.data;
