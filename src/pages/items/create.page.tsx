import { useMemo } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

import { AppHead } from '../../components/AppHead';
import { ViewItem } from './View/Item';
import { NewItemSchema, TNewItemSchema } from '../../model/model';
import { useModel } from '../../model/use-model';

interface Props {}

const NewItem = ({}: Props) => {
  const UserModel = useModel();
  const item = useMemo(() => NewItemSchema.merge(UserModel).parse({}), []);

  return (
    <>
      <AppHead subTitle='New Item'>
        <meta name='description' content='New Item for My Storeleft' />
      </AppHead>
      <VStack>
        <Heading>New Item</Heading>
        <ViewItem<typeof UserModel & TNewItemSchema> type='new' item={item} />
      </VStack>
    </>
  );
};

export default NewItem;
