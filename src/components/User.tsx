import * as HoverCard from '@radix-ui/react-hover-card';
import { QSession } from '@utils/trpc';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { FC } from 'react';
import { HiMail, HiUser } from 'react-icons/hi';
import { Button } from './Button';

export interface UserProps {
  user: NonNullable<QSession<'getUser'>>;
}

export const User: FC<UserProps> = ({ user }) => (
  <HoverCard.Root openDelay={0}>
    <HoverCard.Trigger asChild>
      <button
        className="h-[35px] w-[35px] overflow-hidden rounded-full border-2"
        aria-label="Open profile"
      >
        <Image
          src={user.image ?? ''}
          alt="User Icon"
          height="35"
          width="35"
          objectFit="cover"
        />
      </button>
    </HoverCard.Trigger>
    <HoverCard.Content sideOffset={5}>
      <div className="flex flex-col gap-3 rounded-md bg-2 py-5 px-8 shadow-2xl">
        <div className="flex max-w-xs items-center gap-2">
          <HiUser className="h-7 w-7 flex-shrink-0" />
          <span className="truncate" title={user.name ?? ''}>
            {user.name}
          </span>
        </div>
        <div className="flex max-w-xs items-center gap-2">
          <HiMail className="h-7 w-7 flex-shrink-0" />
          <span className="truncate" title={user.email ?? ''}>
            {user.email}
          </span>
        </div>
        <Button className="mt-4 py-2 fluid-base" onClick={() => signOut()}>
          Logout
        </Button>
        <HoverCard.Arrow className="fill-[rgb(var(--backgroundColor-2))]" />
      </div>
    </HoverCard.Content>
  </HoverCard.Root>
);
