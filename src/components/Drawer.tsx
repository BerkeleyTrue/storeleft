import { ReactEventHandler } from 'react';
import {
  Divider,
  List,
  Drawer,
  IconButton,
  Toolbar,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { MainLink } from './Links';

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
    <Drawer open={isOpen} onClose={onClose}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={onMenuClick}>
          <Menu />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component='nav'>
        <>
          {mainNav.map(({ name, href }) => (
            <MainLink key={name} href={href}>
              <ListItemButton>
                <ListItem>{name}</ListItem>
              </ListItemButton>
            </MainLink>
          ))}
          <Divider sx={{ my: 1 }} />
          {secondary.map(({ name, href }) => (
            <MainLink key={name} href={href}>
              <ListItemButton>
                <ListItem key={name}>{name}</ListItem>
              </ListItemButton>
            </MainLink>
          ))}
        </>
      </List>
    </Drawer>
  );
}
