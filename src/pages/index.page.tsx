import { Button, ButtonGroup, Heading, HStack, VStack } from '@chakra-ui/react';

import { AppHead } from '../components/AppHead';

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
            <Button>New Item</Button>
            <Button>View All Items</Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </>
  );
};

export default Index;
