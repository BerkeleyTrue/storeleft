import { useMemo } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

import { AppHead } from '../../components/AppHead';
import { ViewItem } from './View/Item';
import { createNew, TNewItemSchema } from '../../model/model';
import { useModel } from '../../model/use-model';

interface Props {}

const NewItem = ({}: Props) => {
  const model = useModel();
  const item = useMemo(() => createNew(), []);

  return (
    <>
      <AppHead subTitle='New Item'>
        <meta name='description' content='New Item for My Storeleft' />
      </AppHead>
      <VStack>
        <Heading>New Item</Heading>
        <ViewItem<typeof model & TNewItemSchema> type='new' item={item} />
      </VStack>
    </>
  );
};

export default NewItem;
