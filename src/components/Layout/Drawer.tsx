import { MouseEventHandler, ReactEventHandler } from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { SideBarContent } from './SideBarContent';

const sidebarStyles = {
  bg: 'darker.800',
};

export type TNavigation = 'drawer' | 'sidebar';

interface Props {
  isOpen: boolean;
  onMenuClick: ReactEventHandler;
  onClose: ReactEventHandler;
  varient: string;
}

export function AppDrawer({ isOpen, onClose, varient }: Props) {
  return varient === 'sidebar' ? (
    <Box
      p={5}
      w={{ base: '64', xl: '80', '2xl': '96' }}
      h='100%'
      {...sidebarStyles}
    >
      <SideBarContent onMenuClick={onClose as MouseEventHandler} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} onClose={onClose as () => void} placement='left'>
      <DrawerOverlay />
      <DrawerContent pt='8' px='4' {...sidebarStyles}>
        <SideBarContent onMenuClick={onClose as MouseEventHandler} />
      </DrawerContent>
    </Drawer>
  );
}
