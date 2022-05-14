import { ReactEventHandler } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton } from '@chakra-ui/react';

import { AppLink } from '../../components/Links';

interface Props {
  h: number;
  onButtonClick: ReactEventHandler;
}

export const AppBar = ({ onButtonClick, h }: Props) => {
  return (
    <>
      <Box h={h} bg='darker.700'>
        <Flex px={{ base: '4', md: '1' }} h='100%'>
          <Flex h='100%' alignItems='center'>
            <IconButton
              aria-label='Menu'
              onClick={onButtonClick}
              size='sm'
              icon={<HamburgerIcon />}
              display={{ base: 'unset', md: 'none'}}
            />
            <AppLink href='/'>
              <Button h='100%' bg='darker.700'>
                StoreLeft
              </Button>
            </AppLink>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
