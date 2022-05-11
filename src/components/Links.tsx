import { PropsWithChildren } from 'react';
import NextLink from 'next/link';

import { Link as CLink, LinkProps } from '@chakra-ui/react';

interface Props extends LinkProps {
  href: string;
}

export const AppLink = ({
  children,
  href,
  ...props
}: PropsWithChildren<Props>) => (
  <NextLink href={href} passHref>
    <CLink underline='hover' {...props}>
      {children}
    </CLink>
  </NextLink>
);

export { CLink, NextLink };
