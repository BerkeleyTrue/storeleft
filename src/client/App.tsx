import { useBoolean } from '@chakra-ui/hooks';
import {
  AppBar,
  Badge,
  Divider,
  List,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { CircleNotifications, Menu } from '@mui/icons-material';

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
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <CircleNotifications />
          </Badge>
        </IconButton>
      </AppBar>
      <Drawer open={isOpen}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={setOpen.toggle}>
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
    </Box>
  );
}

export default App;
