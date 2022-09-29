// @ts-check
import { z } from 'zod';

const schema = z.object({});

const env = schema.safeParse(process.env);

if (!env.success) process.exit(0);

export default env.data;
