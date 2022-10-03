import { Layout } from '@components/Layout';
import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/800.css';
import { trpc } from '@utils/trpc';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';
import 'tailwindcss/tailwind.css';

type MyAppType = AppType<{ session: Session }>;

const MyApp: MyAppType = ({ Component, pageProps: { session, ...props } }) => (
  <SessionProvider session={session}>
    <Layout>
      <Component {...props} />
    </Layout>
  </SessionProvider>
);

export default trpc.withTRPC(MyApp);
