import { GameStats } from '@components/GameStats';
import { GoogleMap, GoogleMapProps } from '@components/GoogleMap';
import { Layout } from '@components/Layout';
import env from '@env/client.mjs';
import { Status, Wrapper as GoogleMapWrapper } from '@googlemaps/react-wrapper';
import { getServerSession } from '@server/common/server-session';
import { ctxInner } from '@server/context';
import { router } from '@server/routers/_app';
import { createProxySSGHelpers } from '@trpc/react/ssg';
import { trpc } from '@utils/trpc';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import transformer from 'superjson';
import { Page } from './_app';

const renderMap = (status: Status, props: GoogleMapProps) => {
  switch (status) {
    case Status.SUCCESS:
      return <GoogleMap {...props} />;
    case Status.LOADING:
      return <div>loading...</div>;
    case Status.FAILURE:
      return <div>failed</div>;
  }
};

type SSRPage = Page<InferGetServerSidePropsType<typeof getServerSideProps>>;

const GamePage: SSRPage = () => {
  const { data: game } = trpc.game.get.useQuery();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="self-center">
        <GameStats game={game} />
      </div>
      <div className="flex flex-grow">
        {game?.pano && (
          <GoogleMapWrapper
            apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            render={(s) => renderMap(s, game)}
          />
        )}
      </div>
    </div>
  );
};

GamePage.getLayout = (page) => (
  <Layout className="!mt-2 flex w-full">{page}</Layout>
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
