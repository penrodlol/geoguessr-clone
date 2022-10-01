import Link from 'next/link';
import { Theme } from './Theme';

export const Header = () => (
  <header className="sticky top-0 left-0 right-0 z-50">
    <nav>
      <ul className="mx-auto flex max-w-screen-2xl items-center justify-between p-3">
        <li>
          <Link href="/" passHref>
            <a className="fluid-lg">GeoGuessr | Clone</a>
          </Link>
        </li>
        <li>
          <Theme />
        </li>
      </ul>
    </nav>
  </header>
);
