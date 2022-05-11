import { ReactEventHandler } from 'react';
import {
  Divider,
  List,
  Drawer,
  IconButton,
  ListItem,
  DrawerHeader,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { AppLink } from './Links';

interface Props {
  isOpen: boolean;
  onMenuClick: ReactEventHandler;
  onClose: ReactEventHandler;
}

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
export function AppDrawer({ isOpen, onMenuClick, onClose }: Props) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose as () => void}>
      <DrawerHeader
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={onMenuClick} aria-label='menu button'>
          <HamburgerIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <>
          {mainNav.map(({ name, href }) => (
            <AppLink key={name} href={href}>
              <ListItem>{name}</ListItem>
            </AppLink>
          ))}
          <Divider sx={{ my: 1 }} />
          {secondary.map(({ name, href }) => (
            <AppLink key={name} href={href}>
              <ListItem key={name}>{name}</ListItem>
            </AppLink>
          ))}
        </>
      </List>
    </Drawer>
  );
}
