import '@fontsource/nunito';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/800.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
