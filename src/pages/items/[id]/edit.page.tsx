import { Heading, Box } from '@chakra-ui/react';

import { AppHead } from '../../../components/AppHead';

const EditItem = () => {
  return (
    <>
      <AppHead subTitle={`Editing...`} />
      <Box height='4em'>
        <Heading>Editing...</Heading>
      </Box>
    </>
  );
};

export default EditItem;
