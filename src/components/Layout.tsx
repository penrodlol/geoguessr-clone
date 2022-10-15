import { FC, ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout: FC<LayoutProps> = (props) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main
      className={`my-[clamp(1.31rem,calc(-0.52rem+9.15vw),6.00rem)]
                  mx-auto max-w-screen-2xl flex-1 ${props.className ?? ''}`}
    >
      {props.children}
    </main>
    <Footer />
  </div>
);
