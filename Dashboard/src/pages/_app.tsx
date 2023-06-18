import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import './../styles/reset.scss';
import './../styles/defaults.scss';
import './../styles/global.scss';
import { AppProvider } from '@lyttledev-dashboard/contexts/App.context';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@lyttledev-dashboard/lib/apollo-client';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
    </ApolloProvider>
  );
}
