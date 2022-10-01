import { PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Seo } from './Seo';

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Seo />
    <div className="flex min-h-screen flex-col font-serif font-bold tracking-wide">
      <Header />
      <main className="my-[clamp(1.31rem,calc(-0.52rem+9.15vw),6.00rem)] mx-auto max-w-screen-2xl flex-1">
        {children}
      </main>
      <Footer />
    </div>
  </>
);
