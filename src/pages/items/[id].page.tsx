import _ from 'lodash/fp';
import { GetServerSideProps, InferGetStaticPropsType, NextPage } from 'next';
import { Heading, Box } from '@chakra-ui/react';

import { ViewItem } from './View/View';
import { AppHead } from '../../components/AppHead';
import { useGet } from '../../lib/pouchdb/useGet';

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

const NotFound = () => {
  return <>Not found</>;
};

const ItemView: NextPage<Props> = ({ itemId }) => {
  if (!itemId) {
    return <NotFound />;
  }

  const getRes = useGet({ query: { docId: itemId } });

  if (getRes.error) {
    throw getRes.error;
  }

  if (!getRes.data) {
    return <NotFound />;
  }

  const item = getRes.data;

  return (
    <>
      <AppHead subTitle={`${itemId}`} />
      <Box mb='1em'>
        <Heading>Item: {item.name}</Heading>
      </Box>
      <ViewItem itemId={itemId} />
    </>
  );
};

export default ItemView;
