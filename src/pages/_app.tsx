import { Layout } from '@components/Layout';
import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/800.css';
import { trpc } from '@utils/trpc';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import 'tailwindcss/tailwind.css';

export type Page<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode) => ReactElement;
};

export type Props = AppProps<{ session: Session }> & { Component: Page };

const MyApp = ({ Component, pageProps: { session, ...props } }: Props) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...props} />)}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
