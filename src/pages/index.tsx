import { Button } from '@components/Button';
import { Providers } from '@components/Providers';
import { trpc } from '@utils/trpc';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { data: user, isLoading } = trpc.session.getUser.useQuery();

  return (
    <section className="flex flex-col items-center gap-2">
      <h1 className="text-gradient fluid-5xl">GeoGuessr Clone</h1>
      <p className="fluid-2xl">A clone of the popular game GeoGuessr.</p>
      <div className="mt-20 flex flex-col gap-5">
        {!isLoading &&
          (user ? <Button className="fluid-xl">Play</Button> : <Providers />)}
      </div>
    </section>
  );
};

export default Home;
