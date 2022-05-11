import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Button, Divider, VStack, Spacer } from '@chakra-ui/react';
import { ReactEventHandler } from 'react';

import { NextLink } from '../../components/Links';

const mainNav = [
  {
    name: 'Items',
    href: '/items',
  },
  {
    name: 'Containers',
    href: '/containers',
  },
  {
    name: 'Tree',
    href: '/tree',
  },
  {
    name: 'Search',
    href: '/search',
  },
];

const secondary = [
  {
    name: 'Config',
    href: '/config',
  },
  {
    name: 'Connection',
    href: '/connection',
  },
];

interface Props {
  onMenuClick: ReactEventHandler;
}

export const SideBarContent = ({ onMenuClick }: Props) => {
  return (
    <Flex h='100%' w='100%' flexFlow='column' justifyContent='space-between'>
      <VStack w='100%' alignItems='stretch'>
        <Flex justifyContent='flex-end' direction='row' mb='8'>
          <HamburgerIcon onClick={onMenuClick} mr='4' />
        </Flex>

        {mainNav.map(({ name, href }) => (
          <NextLink key={name} href={href}>
            <Button w='100%' display='flex' justifyContent='left'>
              {name}
            </Button>
          </NextLink>
        ))}
      </VStack>
      <Divider sx={{ my: 4 }} />
      <VStack>
        {secondary.map(({ name, href }) => (
          <NextLink key={name} href={href}>
            <Button w='100%' display='flex' justifyContent='left'>
              {name}
            </Button>
          </NextLink>
        ))}
      </VStack>
      <Spacer />
    </Flex>
  );
};
