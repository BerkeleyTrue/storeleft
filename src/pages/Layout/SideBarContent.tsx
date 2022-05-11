import { ReactEventHandler } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Button, Divider, VStack, Spacer, Text } from '@chakra-ui/react';

import { NextLink } from '../../components/Links';
import { NavItem } from './Nav/NavItem';

const mainNav = [
  {
    name: 'Home',
    href: '/',
  },
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

export const SideBarContent = () => {
  return (
    <Flex
      as='nav'
      h='100%'
      w='100%'
      flexFlow='column'
      justifyContent='space-between'
    >
      <Flex px='4' py='5' align='center'>
        <Text fontSize='2xl' ml='2' color={'white'} fontWeight='semibold'>
          Store Left
        </Text>
      </Flex>
      <VStack w='100%' alignItems='stretch'>
        {mainNav.map(({ name, href }) => (
          <NavItem key={name} href={href}>
            {name}
          </NavItem>
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
