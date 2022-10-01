import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { ReactNode, useCallback, useEffect, useState } from 'react';

type _Theme = 'light' | 'dark';

const THEMES: Record<_Theme, ReactNode> = {
  light: <MoonIcon className="h-8 w-8" />,
  dark: <SunIcon className="h-8 w-8" />,
};

export const Theme = () => {
  const [theme, setTheme] = useState<_Theme | null>(null);

  useEffect(() => setTheme(localStorage.getItem('theme') as _Theme), []);

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', next);
    if (theme) document.body.classList.remove(theme);
    document.body.classList.add(next);
    setTheme(next);
  }, [theme]);

  return (
    <button className="rounded-md" onClick={toggle}>
      {theme && THEMES[theme]}
    </button>
  );
};
