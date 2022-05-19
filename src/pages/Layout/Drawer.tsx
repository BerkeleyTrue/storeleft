import { ComponentProps, MouseEventHandler, ReactEventHandler, useCallback } from 'react';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { SideBarContent } from './SideBarContent';
import { useSwipeable } from 'react-swipeable';

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

  const handlers = useSwipeable({
    preventScrollOnSwipe: true,
    onSwipedLeft: onClose as () => void,
    trackMouse: true,
  });

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
      <Drawer isOpen={isOpen} onClose={onClose as () => void} placement='left'>
        <DrawerOverlay />
        <DrawerContent pt='8' px='4'>
          <DrawerCloseButton />
          <SideBarContent swipeHandlers={handlers} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
