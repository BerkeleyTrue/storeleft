import NextHead from 'next/head';
import { PropsWithChildren } from 'react';

interface Props {
  subTitle: string;
}

export const AppHead = ({ subTitle, children }: PropsWithChildren<Props>) => (
  <NextHead>
    <title>StoreLeft//{subTitle}</title>
    <link href='/images/favicon.ico' rel='shortcut icon' />
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    />
    {children}
  </NextHead>
);
