import { Button } from '@components/Button';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <section className="flex flex-col items-center gap-2">
        <h1 className="bg-gradient-to-r from-brand-2 to-brand-1 bg-clip-text text-transparent fluid-5xl">
          GeoGuessr Clone
        </h1>
        <p className="max-w-prose fluid-2xl">
          A clone of the popular game GeoGuessr.
        </p>
        <Button className="mt-20 max-w-max fluid-xl">Play</Button>
      </section>
    </>
  );
};

export default Home;
