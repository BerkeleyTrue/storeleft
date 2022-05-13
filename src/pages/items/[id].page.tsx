import _ from 'lodash/fp';
import { GetServerSideProps, NextPage } from 'next';
import { Heading, Box } from '@chakra-ui/react';

import { ItemView } from './View/View';
import { AppHead } from '../../components/AppHead';
import { useGet } from '../../lib/pouchdb/useGet';
import { BaseSchema, TBaseSchema } from '../../model/model';
import { useModel } from '../../model/use-model';

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

const ItemPage: NextPage<Props> = ({ itemId }) => {
  const model = useModel();
  const getRes = useGet<typeof model & TBaseSchema>({
    query: { docId: itemId },
  });

  const itemParse = model
    ? model.safeParse(getRes.data)
    : BaseSchema.safeParse(getRes.data);

  if (!itemId || !getRes.data) {
    return <NotFound />;
  }

  if (getRes.error) {
    throw getRes.error;
  }

  if (!itemParse.success) {
    throw itemParse.error;
  }

  const item = itemParse.data;

  return (
    <>
      <AppHead subTitle={` ${item.name || itemId}`} />
      <Box mb='1em'>
        <Heading>Item: {item.name || itemId || 'N/A'}</Heading>
      </Box>
      <ItemView item={item} />
    </>
  );
};

export default ItemPage;
