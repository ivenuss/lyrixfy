import '../styles/globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'simplebar/dist/simplebar.min.css';
import React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import { Outfit } from '@next/font/google';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import type { AppType } from 'next/app';
import { Toaster } from '~/components/Toaster';
import { api } from '~/lib/api';

const customFont = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const router = useRouter();

  React.useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Toaster position="bottom-center" />
      <div className={customFont.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
