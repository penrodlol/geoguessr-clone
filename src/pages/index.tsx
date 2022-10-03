import { Login } from '@components/Login';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <section className="flex flex-col items-center gap-2">
    <h1 className="bg-gradient-to-r from-brand-2 to-brand-1 bg-clip-text text-transparent fluid-5xl">
      GeoGuessr Clone
    </h1>
    <p className="max-w-prose fluid-2xl">
      A clone of the popular game GeoGuessr.
    </p>
    <div className="mt-20 flex flex-col gap-5">
      <Login provider="google" />
      <Login provider="github" />
    </div>
  </section>
);

export default Home;
