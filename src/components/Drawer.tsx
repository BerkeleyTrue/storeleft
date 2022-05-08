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

interface Props {
  isOpen: boolean;
  onMenuClick: ReactEventHandler;
}

const mainNav = [
  {
    name: 'Items',
  },
  {
    name: 'Containers',
  },
  {
    name: 'Tree',
  },
  {
    name: 'Search',
  },
];

const secondary = [
  {
    name: 'Config',
  },
  {
    name: 'Connection',
  },
];
export function AppDrawer({ isOpen, onMenuClick }: Props) {
  return (
    <Drawer open={isOpen}>
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
          {mainNav.map(({ name }) => (
            <ListItemButton>
              <ListItem key={name}>{name}</ListItem>
            </ListItemButton>
          ))}
          <Divider sx={{ my: 1 }} />
          {secondary.map(({ name }) => (
            <ListItemButton>
              <ListItem key={name}>{name}</ListItem>
            </ListItemButton>
          ))}
        </>
      </List>
    </Drawer>
  );
}
