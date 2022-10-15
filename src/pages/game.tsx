import { Layout } from '@components/Layout';
import { Map } from '@components/Map';
import { getServerSession } from '@server/common/server-session';
import { ctxInner } from '@server/context';
import { router } from '@server/routers/_app';
import { createProxySSGHelpers } from '@trpc/react/ssg';
import { trpc } from '@utils/trpc';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import transformer from 'superjson';
import { Page } from './_app';

type SSRPage = Page<InferGetServerSidePropsType<typeof getServerSideProps>>;

const GamePage: SSRPage = () => {
  const ctx = trpc.useContext();

  const { data: game } = trpc.game.get.useQuery();
  const { mutate: nextRound } = trpc.game.createNextRound.useMutation({
    onSuccess: async (payload) => {
      if (!game || !payload) return;

      const rounds = [{ coordinate: payload.coordinate }, ...game.rounds];
      ctx.game.get.setData({ ...game, rounds });
    },
  });

  return (
    <div className="flex flex-grow">
      {game?.rounds[0]?.coordinate && (
        <Map coordinate={game.rounds[0].coordinate} />
      )}
    </div>
  );
};

GamePage.getLayout = (page) => (
  <Layout className="my-0 mx-0 flex h-full w-full max-w-none">{page}</Layout>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession({ ...ctx });
  if (!session) return { redirect: { destination: '/', permanent: false } };

  const _ctxInner = await ctxInner({ session });
  const ssg = createProxySSGHelpers({ router, ctx: _ctxInner, transformer });
  await ssg.game.get.prefetch();

  return { props: {} };
};

export default GamePage;
