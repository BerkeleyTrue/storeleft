import { Heading } from '@chakra-ui/react';

import { AppHead } from '../components/AppHead';
import { Layout } from '../components/Layout';


const Index = () => {
  return (
    <>
      <AppHead subTitle='Items'>
        <meta name='description' content='Home page of My Storeleft' />
      </AppHead>
      <Layout>
        <Heading>
          Home
        </Heading>
      </Layout>
    </>
  );
};

export default Index;
