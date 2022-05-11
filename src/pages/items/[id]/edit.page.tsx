import { Heading, Box } from '@chakra-ui/react';

import { AppHead } from '../../../components/AppHead';
import { Layout } from '../../Layout';

const EditItem = () => {
  return (
    <>
      <AppHead subTitle={`Editing...`} />
      <Layout>
        <Box height='4em'>
          <Heading>Editing...</Heading>
        </Box>
      </Layout>
    </>
  );
};

export default EditItem;
