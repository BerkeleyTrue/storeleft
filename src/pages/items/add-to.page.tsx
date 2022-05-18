import * as R from 'remeda';
import { useMemo } from 'react';
import { Heading, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { AppHead } from '../../components/AppHead';
import { ViewItem } from './View/Item';
import { NewItemSchema, TNewItemSchema } from '../../model/model';
import { useModel } from '../../model/use-model';

interface Props {
  location: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { location: string }
> = async ({ query: { location } = {} }) => {
  location = Array.isArray(location) ? R.first(location) : location;
  if (!location) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      location,
    },
  };
};

const AddToContainer = ({ location }: Props) => {
  const UserModel = useModel();

  const item = useMemo<TNewItemSchema>(
    () =>
      UserModel.merge(NewItemSchema).parse({
        location,
      }) ,
    [UserModel, location],
  );

  return (
    <>
      <AppHead subTitle='New Item'>
        <meta name='description' content='New Item for My Storeleft' />
      </AppHead>
      <VStack>
        <Heading>New Item in {location}</Heading>
        <ViewItem<TNewItemSchema> type='new' item={item} />
      </VStack>
    </>
  );
};

export default AddToContainer;
