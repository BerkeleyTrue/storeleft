import { useBoolean } from '@chakra-ui/hooks';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Menu } from '@mui/icons-material';
import { AppDrawer } from './Drawer';

function App() {
  const [isOpen, setOpen] = useBoolean(false);
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
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
      <AppDrawer isOpen={isOpen} onMenuClick={setOpen.toggle}/>
    </Box>
  );
}

export default App;
