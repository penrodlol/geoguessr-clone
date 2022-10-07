import { getServerSession } from '@server/common/server-session';
import { ctxInner } from '@server/context';
import { router } from '@server/routers/_app';
import { createProxySSGHelpers } from '@trpc/react/ssg';
import { QGame } from '@utils/trpc';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import transformer from 'superjson';

type SSRPage = NextPage<InferGetServerSidePropsType<typeof getServerSideProps>>;
type SSRProps = { game: QGame<'get'> };

const GamePage: SSRPage = ({ game }) => {
  return (
    <>
      <h1 className="text-gradient fluid-2xl">
        Lat: {game.rounds[0]?.coordinate.lat}
      </h1>
      <h1 className="text-gradient fluid-2xl">
        Lng: {game.rounds[0]?.coordinate.lng}
      </h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async (ctx) => {
  const session = await getServerSession({ ...ctx });
  if (!session) return { redirect: { destination: '/', permanent: false } };

  const _ctxInner = await ctxInner({ session });
  const ssg = createProxySSGHelpers({ router, ctx: _ctxInner, transformer });
  const game = await ssg.game.get.fetch();

  return { props: { game } };
};

export default GamePage;
