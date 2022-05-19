import { ComponentProps, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useBoolean } from '@chakra-ui/hooks';
import { Flex, Box } from '@chakra-ui/react';

import { AppDrawer } from './Drawer';
import { AppBar } from './AppBar';

type BoxWidth = ComponentProps<typeof Box>['width'];

const getContentWidth = (size: number | string): string =>
  `calc(100% - var(--chakra-sizes-${size}))`;

const headerSize = 12;

const sidebarWidth: BoxWidth = { base: '64', xl: '80', '2xl': '96' };
const contentWidth: BoxWidth = {
  sm: '100%',
  md: getContentWidth(sidebarWidth.base as string),
  xl: getContentWidth(sidebarWidth.base as string),
  '2xl': getContentWidth(sidebarWidth.base as string),
};

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  const [isSidebarOpen, setSidebar] = useBoolean(false);

  useEffect(() => {
    setSidebar.off();
  }, [setSidebar, router.pathname]);

  return (
    <Flex width='100vw' height='100vh'>
      <AppDrawer
        isOpen={isSidebarOpen}
        onMenuClick={setSidebar.toggle}
        onClose={setSidebar.off}
        sidebarWidth={sidebarWidth}
      />

      <Flex
        flexGrow={1}
        h='100%'
        maxH='100vh'
        maxW={contentWidth}
        flexDir='column'
        width='100%'
      >
        <AppBar h={headerSize} onButtonClick={setSidebar.toggle} />

        <Flex
          h={`calc(100% - var(--chakra-sizes-${headerSize}))`}
          w='100%'
          px='4'
          overflowX='hidden'
          overflowY='auto'
        >
          <Box
            mx='auto'
            w='100%'
            maxW='container.xl'
            pt={{ base: '4', md: '16' }}
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
