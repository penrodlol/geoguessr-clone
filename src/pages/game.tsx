import { Button } from '@components/Button';
import { Map } from '@components/Map';
import { getServerSession } from '@server/common/server-session';
import { ctxInner } from '@server/context';
import { router } from '@server/routers/_app';
import { createProxySSGHelpers } from '@trpc/react/ssg';
import { trpc } from '@utils/trpc';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import transformer from 'superjson';

type SSRPage = NextPage<InferGetServerSidePropsType<typeof getServerSideProps>>;

const GamePage: SSRPage = () => {
  const ctx = trpc.useContext();

  const { data: game } = trpc.game.get.useQuery();
  const { mutate: nextRound } = trpc.game.createNextRound.useMutation({
    onSuccess: async (payload) => {
      if (!game || !payload) return;

      ctx.game.get.setData({
        ...game,
        rounds: [{ coordinate: payload.coordinate }, ...game.rounds],
      });
    },
  });

  return (
    <>
      {game?.rounds[0]?.coordinate && (
        <div className="fluid-xl">
          <div className="fixed top-2 left-2 z-20 mt-10 bg-2">
            <Button onClick={() => nextRound(game.id)}>Next Round</Button>
          </div>
          <Map coordinate={game.rounds[0].coordinate} />
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession({ ...ctx });
  if (!session) return { redirect: { destination: '/', permanent: false } };

  const _ctxInner = await ctxInner({ session });
  const ssg = createProxySSGHelpers({ router, ctx: _ctxInner, transformer });
  await ssg.game.get.prefetch();

  return { props: {} };
};

export default GamePage;
