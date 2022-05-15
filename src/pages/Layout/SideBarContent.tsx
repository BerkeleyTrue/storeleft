import { Flex, Divider, VStack, Spacer, Text } from '@chakra-ui/react';

import { NavItem } from './Nav/NavItem';

const mainNav = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Add Item',
    href: '/items/create',
  },
  {
    name: 'Items',
    href: '/items',
  },
  {
    name: 'Places',
    href: '/containers',
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
          <NavItem key={name} href={href}>
            {name}
          </NavItem>
        ))}
      </VStack>
      <Spacer />
    </Flex>
  );
};
