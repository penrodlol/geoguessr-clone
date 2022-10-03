import { ReactNode, useCallback, useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

type _Theme = 'light' | 'dark';

const THEMES: Record<_Theme, ReactNode> = {
  light: <HiMoon className="h-8 w-8" />,
  dark: <HiSun className="h-8 w-8" />,
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
    <button className="translate-y-[3.5px] rounded-md" onClick={toggle}>
      {theme && THEMES[theme]}
    </button>
  );
};
