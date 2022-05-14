import { ComponentProps, ReactEventHandler } from 'react';
import { Box, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { SideBarContent } from './SideBarContent';

const sidebarStyles = {
  bg: 'darker.800',
};

interface Props {
  isOpen: boolean;
  onMenuClick: ReactEventHandler;
  onClose: ReactEventHandler;
  sidebarWidth: ComponentProps<typeof Box>['width'];
}

export function AppDrawer({ isOpen, onClose, sidebarWidth }: Props) {
  return (
    <>
      <Box
        p={5}
        w={sidebarWidth}
        h='100%'
        {...sidebarStyles}
        display={{ base: 'none', md: 'unset' }}
      >
        <SideBarContent />
      </Box>
      <Drawer
        isOpen={isOpen}
        onClose={onClose as () => void}
        placement='left'
      >
        <DrawerOverlay />
        <DrawerContent pt='8' px='4' {...sidebarStyles}>
          <SideBarContent />
        </DrawerContent>
      </Drawer>
    </>
  );
}
