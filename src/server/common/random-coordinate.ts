import { Coordinate } from '@prisma/client';
import { Context } from '../context';

export const getRandomCoordinate = async (ctx: Context) =>
  ctx.prisma.$queryRaw<Array<Pick<Coordinate, 'id'>>>`
    select id from "Coordinate"
    order by random()
    limit 1
  `.then(([row]) => row?.id);
