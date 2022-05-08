import { PropsWithChildren } from 'react';
import { useBoolean } from '@chakra-ui/hooks';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Menu } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

import { AppDrawer } from './Drawer';
import { MainLink } from './Links';

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const [isOpen, setOpen] = useBoolean(false);
  return (
    <Box width='100vw' height='100vh'>
      <AppBar>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={setOpen.toggle}
            sx={{
              marginRight: '36px',
              ...(isOpen && { display: 'none' }),
            }}
          >
            <Menu />
          </IconButton>
          <MainLink href='/' color={grey[50]}>
            StoreLeft
          </MainLink>
        </Toolbar>
      </AppBar>
      <AppDrawer
        isOpen={isOpen}
        onMenuClick={setOpen.toggle}
        onClose={setOpen.off}
      />
      <Toolbar />
      <Stack height='100%' width='100%' overflow-x='hidden'>
        <Box height='4em'>
          <Typography>Items</Typography>
        </Box>
        <Box flexGrow='1'>{children}</Box>
      </Stack>
    </Box>
  );
};
