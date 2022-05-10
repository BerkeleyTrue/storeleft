import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { AppHead } from '../../components/AppHead';
import { Layout } from '../../components/Layout';

const EditItem = () => {
  return (
    <>
      <AppHead subTitle={`item.${1324}`} />
      <Layout>
        <Box height='4em'>
          <Typography>Item 1234</Typography>
        </Box>
      </Layout>
    </>
  );
};

export default EditItem;
