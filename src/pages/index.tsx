import { Button } from '@components/Button';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => (
  <section className="flex flex-col items-center gap-2">
    <h1 className="bg-gradient-to-r from-brand-2 to-brand-1 bg-clip-text text-transparent fluid-5xl">
      GeoGuessr Clone
    </h1>
    <p className="max-w-prose fluid-2xl">
      A clone of the popular game GeoGuessr.
    </p>
    <Link href="/play/sessionid" passHref>
      <Button className="mt-20 max-w-max">Play</Button>
    </Link>
  </section>
);

export default Home;
