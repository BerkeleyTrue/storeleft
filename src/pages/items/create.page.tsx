import { useMemo } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

import { AppHead } from '../../components/AppHead';
import { ViewItem } from './View/Item';
import { NewItemSchema, TNewItemSchema } from '../../model/model';
import { useModel } from '../../model/use-model';

interface Props {}

const NewItem = ({}: Props) => {
  const UserModel = useModel();
  const item = useMemo(
    () => UserModel.merge(NewItemSchema).parse({}),
    [UserModel],
  );

  return (
    <>
      <AppHead subTitle='New Item'>
        <meta name='description' content='New Item for My Storeleft' />
      </AppHead>
      <VStack>
        <Heading>New Item</Heading>
        <ViewItem<TNewItemSchema & typeof UserModel> type='new' item={item} />
      </VStack>
    </>
  );
};

export default NewItem;
