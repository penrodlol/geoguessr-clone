import { signIn } from 'next-auth/react';
import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io5';
import { Button } from './Button';

export const GoogleLogin = () => (
  <Button className="flex items-center gap-3" onClick={() => signIn('google')}>
    <IoLogoGoogle className="h-7 w-7" />
    <span>Login with Google</span>
  </Button>
);

export const GithubLogin = () => (
  <Button className="flex items-center gap-3" onClick={() => signIn('github')}>
    <IoLogoGithub className="h-7 w-7" />
    <span>Login with Github</span>
  </Button>
);
