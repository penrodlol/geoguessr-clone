import { Button } from '@components/Button';
import { Providers } from '@components/Providers';
import { getServerSession } from '@server/common/server-session';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

type SSRPage = NextPage<InferGetServerSidePropsType<typeof getServerSideProps>>;
type SSRProps = { loggedIn: boolean };

const Home: SSRPage = ({ loggedIn }) => (
  <section className="flex flex-col items-center gap-2">
    <h1 className="text-gradient fluid-5xl">GeoGuessr Clone</h1>
    <p className="fluid-2xl">A clone of the popular game GeoGuessr.</p>
    <div className="mt-20 flex flex-col gap-5">
      {loggedIn ? <Button className="fluid-xl">Play</Button> : <Providers />}
    </div>
  </section>
);

export const getServerSideProps: GetServerSideProps<SSRProps> = async (ctx) => {
  const session = await getServerSession({ req: ctx.req, res: ctx.res });
  return { props: { loggedIn: !!session?.user } };
};

export default Home;
