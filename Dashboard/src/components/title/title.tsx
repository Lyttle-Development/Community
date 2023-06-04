import Head from 'next/head';
import { Constants } from '@lyttledev-dashboard/constants';

interface TitleProps {
  children?: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  const title = `${children ?? 'Home'} - ${Constants.appName}`;
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
