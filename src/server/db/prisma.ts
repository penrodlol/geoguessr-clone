import env from '@env/server.mjs';
import { PrismaClient } from '@prisma/client';

const prismaGlobal = global as typeof global & { prisma?: PrismaClient };

export const prisma = prismaGlobal.prisma || new PrismaClient();

if (env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma;
