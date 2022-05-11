import { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { O } from 'ts-toolbelt';

import { NextLink } from '../../../components/Links';

type NavItemProps = PropsWithChildren<
  O.Merge<{ href: string; icon?: ReactNode }, ComponentProps<typeof Flex>>
>;

export const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <NextLink href={href}>
      <Flex
        align='center'
        px='4'
        pl='4'
        py='3'
        cursor='pointer'
        color={'gray.400'}
        _hover={{
          bg: 'gray.900',
          color: 'gray.200',
        }}
        role='group'
        fontWeight='semibold'
        transition='.15s ease'
        {...rest}
      >
        {icon && (
          <Icon
            mx='2'
            boxSize='4'
            _groupHover={{
              color: 'gray.300',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NextLink>
  );
};
