import { BuiltInProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io5';
import { Button } from './Button';

const ProviderIcon: Partial<Record<BuiltInProviderType, ReactNode>> = {
  google: <IoLogoGoogle className="h-7 w-7" />,
  github: <IoLogoGithub className="h-7 w-7" />,
};

export interface LoginProps {
  provider: BuiltInProviderType;
}

export const Login: FC<LoginProps> = ({ provider }) => (
  <Button className="flex items-center gap-3" onClick={() => signIn(provider)}>
    {ProviderIcon[provider]}
    <span>
      Login with <span className="capitalize">{provider}</span>
    </span>
  </Button>
);
