import { trpc } from '@utils/trpc';
import Link from 'next/link';
import { Theme } from './Theme';
import { User } from './User';

export const Header = () => {
  const { data: user } = trpc.session.getUser.useQuery();

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <nav>
        <ul className="mx-auto flex max-w-screen-2xl items-center gap-7 p-3">
          <li className="mr-auto">
            <Link href="/" passHref>
              <a className="fluid-lg">GeoGuessr | Clone</a>
            </Link>
          </li>
          {user && <User user={user} />}
          <li>
            <Theme />
          </li>
        </ul>
      </nav>
    </header>
  );
};
