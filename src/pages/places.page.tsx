import { Heading, VStack } from '@chakra-ui/react';

import { PlacesView } from './places/PlacesView';
import { AppHead } from '../components/AppHead';

export const PlacesPage = () => {
  return (
    <>
      <AppHead subTitle='Containers'>
        <meta name='description' content='Places list of My Storeleft' />
      </AppHead>
      <VStack>
        <Heading>Places</Heading>
        <PlacesView />
      </VStack>
    </>
  );
};

export default PlacesPage;
