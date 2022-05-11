import { ReactEventHandler } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex } from '@chakra-ui/react';

import { AppLink } from '../Links';

interface Props {
  h: number;
  showMenuButton: boolean;
  onButtonClick: ReactEventHandler;
}

export const AppBar = ({ showMenuButton, onButtonClick, h }: Props) => {
  return (
    <>
      <Box h={h} bg='darker.700'>
        <Container px={{ base: '4', md: '1' }} h='100%'>
          <Flex h='100%' alignItems='center'>
            {showMenuButton && <HamburgerIcon onClick={onButtonClick} mr='4' />}
            <AppLink href='/'>
              <Button h='100%' bg='darker.700'>
                StoreLeft
              </Button>
            </AppLink>
          </Flex>
        </Container>
      </Box>
    </>
  );
};
