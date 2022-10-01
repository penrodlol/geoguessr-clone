// @ts-check
(() => {
  const persisted = localStorage.getItem('theme');
  const perfersDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (persisted) return document.body.classList.add(persisted);

  const theme = perfersDark.matches ? 'dark' : 'light';

  document.body.classList.add(theme);
  localStorage.setItem('theme', theme);
})();
