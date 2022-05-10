import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { AppHead } from '../../../components/AppHead';
import { Layout } from '../../../components/Layout';

const EditItem = () => {
  return (
    <>
      <AppHead subTitle={`Editing...`} />
      <Layout>
        <Box height='4em'>
          <Typography>Editing...</Typography>
        </Box>
      </Layout>
    </>
  );
};

export default EditItem;
