import { Flex, Divider, VStack, Spacer, Text } from '@chakra-ui/react';
import { SwipeableHandlers } from 'react-swipeable';

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
    name: 'Add Item',
    href: '/items/create',
  },
  {
    name: 'Places',
    href: '/places',
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

export const SideBarContent = ({ swipeHandlers }: { swipeHandlers?: SwipeableHandlers }) => {
  return (
    <Flex
      as='nav'
      h='100%'
      w='100%'
      flexFlow='column'
      justifyContent='space-between'
      {...swipeHandlers}
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
