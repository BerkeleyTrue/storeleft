import { ElementType, PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { Link as MLink } from '@mui/material';
import { LinkProps } from '@mui/material/Link/Link';

interface Props {
  href: string;
}

export const MainLink = <D extends ElementType>({
  children,
  href,
  ...props
}: LinkProps<D, PropsWithChildren<Props>>) => (
  <NextLink href={href} passHref>
    <MLink underline='hover' {...props}>
      {children}
    </MLink>
  </NextLink>
);

export { MLink, NextLink };
