import { Button, ButtonGroup, Heading, HStack, VStack } from '@chakra-ui/react';

import { AppHead } from '../components/AppHead';
import { NextLink } from '../components/Links';

const Index = () => {
  return (
    <>
      <AppHead subTitle='Items'>
        <meta name='description' content='Home page of My Storeleft' />
      </AppHead>
      <VStack justify='stretch' spacing='4'>
        <Heading>Home</Heading>
        <HStack>
          <ButtonGroup>
            <NextLink href='/items/create'>
              <Button>New Item</Button>
            </NextLink>
              <NextLink href='/items'>
            <Button>View All Items</Button>
            </NextLink>
          </ButtonGroup>
        </HStack>
      </VStack>
    </>
  );
};

export default Index;
