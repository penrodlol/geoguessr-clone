import Head from 'next/head';

const TITLE = 'GeoGuessr | Clone';
const DESCRIPTION = 'A clone of the popular game GeoGuessr';

export const Seo = () => (
  <Head>
    <title>{TITLE}</title>

    <meta name="title" content={TITLE} />
    <meta name="description" content={DESCRIPTION} />
  </Head>
);
