import { Layout } from '@components/Layout';
import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/800.css';
import { trpc } from '@utils/trpc';
import type { AppType } from 'next/app';
import 'tailwindcss/tailwind.css';

const MyApp: AppType = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default trpc.withTRPC(MyApp);
