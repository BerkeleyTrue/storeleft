import _ from 'lodash/fp';
import { GetServerSideProps, InferGetStaticPropsType, NextPage } from 'next';
import { Heading, Box } from '@chakra-ui/react';

import { AppHead } from '../../components/AppHead';
import { ViewItem } from './View';
import { Layout } from '../Layout';

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
            <Heading>Item: {itemId}</Heading>
        </Box>
        <ViewItem itemId={itemId} />
      </Layout>
    </>
  );
};

export default ItemView;
