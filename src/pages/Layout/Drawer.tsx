import { ComponentProps, MouseEventHandler, ReactEventHandler } from 'react';
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
  sidebarWidth: ComponentProps<typeof Box>['width'];
}

export function AppDrawer({ isOpen, onClose, varient, sidebarWidth }: Props) {
  return varient === 'sidebar' ? (
    <Box
      p={5}
      w={sidebarWidth}
      h='100%'
      {...sidebarStyles}
    >
      <SideBarContent />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} onClose={onClose as () => void} placement='left'>
      <DrawerOverlay />
      <DrawerContent pt='8' px='4' {...sidebarStyles}>
        <SideBarContent />
      </DrawerContent>
    </Drawer>
  );
}
