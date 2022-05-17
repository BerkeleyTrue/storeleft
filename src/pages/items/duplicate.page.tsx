import * as R from 'remeda';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Heading,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { AppHead } from '../../components/AppHead';
import { ViewItem } from './View/Item';
import { BaseSchema, TBaseSchema } from '../../model/model';
import { useModel } from '../../model/use-model';
import { usePouchDbContext } from '../../lib/pouchdb';

type PartialBaseModel<T> = Partial<T & TBaseSchema>;

interface Props {
  itemId: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { itemId: string }
> = async ({ query: { itemId } = {} }) => {
  itemId = Array.isArray(itemId) ? R.first(itemId) : itemId;

  if (!itemId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      itemId,
    },
  };
};

const DuplicateItemPage = ({ itemId }: Props) => {
  const UserModel = useModel();
  const { db } = usePouchDbContext();

  const [rawItem, setItem] = useState<PartialBaseModel<
    typeof UserModel
  > | void>();
  const [hasError, setError] = useState<Error | void>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    db.get(itemId)
      .then((res) => {
        setItem(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [db]);

  const item = useMemo(() => {
    if (!rawItem) {
      return {};
    }

    const newItem: PartialBaseModel<typeof UserModel> =
      UserModel.merge(BaseSchema).parse(rawItem);

    delete newItem._id;
    delete newItem._rev;

    return newItem;
  }, [rawItem, UserModel]);

  return (
    <>
      <AppHead subTitle='New Item'>
        <meta name='description' content='New Item for My Storeleft' />
      </AppHead>
      <VStack>
        <Heading>New Item</Heading>
        {hasError ? (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Oops! Something went wrong</AlertTitle>
            <AlertDescription>Couldn't load item `{itemId}`</AlertDescription>
          </Alert>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <ViewItem<PartialBaseModel<typeof UserModel>>
            type='duplicate'
            item={item}
          />
        )}
      </VStack>
    </>
  );
};

export default DuplicateItemPage;
