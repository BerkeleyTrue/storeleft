import { useBoolean } from '@chakra-ui/hooks';
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Menu } from '@mui/icons-material';

import { AppDrawer } from './Drawer';
import { List } from './Items/List';

function App() {
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
          <Typography>StoreLeft</Typography>
        </Toolbar>
      </AppBar>
      <AppDrawer isOpen={isOpen} onMenuClick={setOpen.toggle} />
      <Toolbar />
      <Stack height='100%' width='100%' overflow-x='hidden'>
        <Box height='4em'>
          <Typography>Items</Typography>
        </Box>
        <Box flexGrow='1'>
          <List />
        </Box>
      </Stack>
    </Box>
  );
}

export default App;
