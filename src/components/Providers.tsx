import { BuiltInProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';
import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io5';
import { Button } from './Button';

interface Provider {
  type: BuiltInProviderType;
  name: Capitalize<BuiltInProviderType>;
  icon: ReactNode;
}

const PROVIDERS: ReadonlyArray<Provider> = [
  { type: 'google', name: 'Google', icon: <IoLogoGoogle /> },
  { type: 'github', name: 'Github', icon: <IoLogoGithub /> },
];

export const Providers = () => (
  <>
    {PROVIDERS.map((provider) => (
      <Button
        key={provider.type}
        className="flex items-center gap-3"
        onClick={() => signIn(provider.type)}
      >
        {provider.icon}
        <span>Login with {provider.name}</span>
      </Button>
    ))}
  </>
);
