import { ComponentProps, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useBoolean } from '@chakra-ui/hooks';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';

import { AppDrawer, TNavigation } from './Drawer';
import { AppBar } from './AppBar';

type BoxWidth = ComponentProps<typeof Box>['width'];
interface Variant {
  navigation: TNavigation;
  showButton: boolean;
  sidebarWidth?: BoxWidth;
  contentWidth: BoxWidth;
}

const getContentWidth = (size: number | string): string =>
  `calc(100% - var(--chakra-sizes-${size}))`;

const headerSize = 12;

const sidebarWidth: BoxWidth = { base: '64', xl: '80', '2xl': '96' };

const smVariant: Variant = {
  navigation: 'drawer',
  showButton: true,
  contentWidth: '100%',
};
const mdVariant: Variant = {
  navigation: 'sidebar',
  showButton: false,
  sidebarWidth,
  contentWidth: {
    base: getContentWidth(sidebarWidth.base as string),
    xl: getContentWidth(sidebarWidth.base as string),
    '2xl': getContentWidth(sidebarWidth.base as string),
  },
};

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  const [isSidebarOpen, setSidebar] = useBoolean(false);
  const variants =
    useBreakpointValue<Variant>({ base: smVariant, md: mdVariant }) ||
    smVariant;

  useEffect(() => {
    setSidebar.off();
  }, [router.pathname]);

  return (
    <Flex width='100vw' height='100vh'>
      <AppDrawer
        isOpen={isSidebarOpen}
        onMenuClick={setSidebar.toggle}
        onClose={setSidebar.off}
        varient={variants.navigation}
        sidebarWidth={variants.sidebarWidth}
      />

      <Flex
        flexGrow={1}
        h='100%'
        maxH='100vh'
        maxW={variants.contentWidth}
        flexDir='column'
      >
        <AppBar
          h={headerSize}
          showMenuButton={variants.showButton}
          onButtonClick={setSidebar.toggle}
        />

        <Flex
          h={`calc(100% - var(--chakra-sizes-${headerSize}))`}
          w='100%'
          px='4'
          overflowX='hidden'
          overflowY='auto'
        >
          <Box mx='auto' w='100%' maxW='container.xl'>
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
