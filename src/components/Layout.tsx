import { PropsWithChildren } from 'react';
import { useBoolean } from '@chakra-ui/hooks';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';

import { AppDrawer } from './Drawer';
import { AppBar } from './AppBar';

interface Variant {
  navigation: 'drawer' | 'sidebar';
  showButton: boolean;
}

const headerSize = 12;
const smVariant: Variant = { navigation: 'drawer', showButton: true };
const mdVariant: Variant = { navigation: 'sidebar', showButton: false };

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const [isSidebarOpen, setSidebar] = useBoolean(false);
  const variants = useBreakpointValue<Variant>({ base: smVariant, md: mdVariant }) || smVariant;

  return (
    <Flex width='100vw' height='100vh'>

      <AppDrawer
        isOpen={isSidebarOpen}
        onMenuClick={setSidebar.toggle}
        onClose={setSidebar.off}
      />

      <Flex
        flexGrow={1}
        h="100%"
        maxH="100vh"
        w="100%"
        flexDir="column"
      >
        <AppBar
          h={headerSize}
          showButton={variants.showButton}
          onButtonClick={setSidebar.toggle}
        />

        <Flex
          h={`calc(100% - var(--chakra-sizes-${headerSize}))`}
          w="100%"
          px="4"
          overflowX="hidden"
          overflowY="auto"
        >
          <Box mx="auto" w="100%" maxW="container.xl">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
