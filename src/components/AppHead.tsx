import NextHead from 'next/head';
import { PropsWithChildren } from 'react';

interface Props {
  subTitle: string;
}

export const AppHead = ({ subTitle, children }: PropsWithChildren<Props>) => (
  <NextHead>
    <title>StoreLeft//{subTitle}</title>
    <link href='/images/favicon.ico' rel='shortcut icon' />
    {children}
  </NextHead>
);
