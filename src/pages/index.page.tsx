import { Heading } from '@chakra-ui/react';

import { AppHead } from '../components/AppHead';

const Index = () => {
  return (
    <>
      <AppHead subTitle='Items'>
        <meta name='description' content='Home page of My Storeleft' />
      </AppHead>
      <Heading>Home</Heading>
    </>
  );
};

export default Index;
