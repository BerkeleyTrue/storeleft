import _ from 'lodash/fp';
import { Card, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import { GetServerSideProps, InferGetStaticPropsType, NextPage } from 'next';

import { AppHead } from '../../components/AppHead';
import { ViewItem } from '../../components/Items/View';
import { Layout } from '../../components/Layout';

interface Props {
  itemId: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async ({ query: { id } }) => {
  const itemId = _.join('/', _.castArray(id));
  return {
    props: {
      itemId,
    },
  };
};

const ItemView: NextPage<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ itemId }) => {
  return (
    <>
      <AppHead subTitle={`${itemId}`} />
      <Layout>
        <Box mb='1em'>
          <Card>
            <CardHeader title={`Item: ${itemId}`} />
          </Card>
        </Box>
        <ViewItem itemId={itemId} />
      </Layout>
    </>
  );
};

export default ItemView;
