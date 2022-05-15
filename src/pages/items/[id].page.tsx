import _ from 'lodash/fp';
import { GetServerSideProps, NextPage } from 'next';
import { Heading, Box } from '@chakra-ui/react';

import { ViewItem } from './View/Item';
import { AppHead } from '../../components/AppHead';
import { useGet } from '../../lib/pouchdb/useGet';
import { TBaseSchema } from '../../model/model';
import { useModel } from '../../model/use-model';
import { useMemo } from 'react';

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

const ViewItemPage: NextPage<Props> = ({ itemId }) => {
  const model = useModel();
  const getRes = useGet<typeof model & TBaseSchema>({
    query: { docId: itemId },
  });

  const itemParse = useMemo(() => {
    return model.safeParse(getRes.data);
  }, [model, getRes.data]);

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
      <ViewItem<typeof model & TBaseSchema>
        item={item}
        onItemMutate={getRes.mutate}
      />
    </>
  );
};

export default ViewItemPage;
