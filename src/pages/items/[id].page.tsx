import _ from 'lodash/fp';
import { useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
  Heading,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { ViewItem } from './View/Item';

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

const ViewItemPage: NextPage<Props> = ({ itemId }) => {
  const UserSchema = useModel();
  const getRes = useGet<typeof UserSchema & TBaseSchema>({
    query: { docId: itemId },
  });

  const itemParse = useMemo(() => {
    return UserSchema.merge(BaseSchema).safeParse(getRes.data);
  }, [UserSchema, getRes.data]);

  if (!itemId || !getRes.data) {
    return <NotFound />;
  }

  if (!itemParse.success && itemParse.error) {
    console.error(itemParse.error);
  }

  if (getRes.error) {
    console.error(getRes.error);
  }

  const item = (itemParse.success && itemParse.data) || { name: '' };

  return (
    <>
      <AppHead subTitle={` ${item.name || itemId}`} />
      <Box mb='1em'>
        <Heading>Item: {item.name || itemId || 'N/A'}</Heading>
      </Box>
      {!getRes.data ? (
        <Spinner />
      ) : getRes.error || (!itemParse.success && itemParse.error) ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Oops! Something went wrong</AlertTitle>
          <AlertDescription>
            Could not {getRes.error ? 'load' : 'parse'} item `{itemId}`
          </AlertDescription>
        </Alert>
      ) : (
        <ViewItem<TBaseSchema & typeof UserSchema>
          type='update'
          item={item}
          onItemMutate={getRes.mutate}
        />
      )}
    </>
  );
};

export default ViewItemPage;
