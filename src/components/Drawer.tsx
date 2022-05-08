import { ReactEventHandler } from 'react';
import { Divider, List, Drawer, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';

interface Props {
  isOpen: boolean;
  onMenuClick: ReactEventHandler;
}

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
      <List component="nav">
        {/* {mainListItems} */}
        <Divider sx={{ my: 1 }} />
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  );
}
