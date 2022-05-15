import * as R from 'remeda';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { KeyedMutator } from 'swr';
import { chakra } from '@chakra-ui/system';
import {
  Box,
  Stack,
  Flex,
  Button,
  VStack,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  ButtonGroup,
  useToast,
  Badge,
  Spacer,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { PathInput } from './PathInput';
import { DatePicker } from './date';
import { ListField } from './List';
import { LibraryStatus } from './LibraryStatus';

import {
  NewItemSchema,
  TBaseSchema,
  TNewItemSchema,
} from '../../../model/model';
import { useConfig } from '../../../services/config/use-config';
import { useModel } from '../../../model/use-model';
import { usePut, usePost } from '../../../lib/pouchdb';
import { defaultTo } from '../../../lib/remeda/defaultTo';
import { StoreleftConfig } from '../../../types';
import { useRouter } from 'next/router';
import { Group } from './Group';

const Form = chakra('form');

const isExistingItem = (
  i: Partial<TBaseSchema> | Partial<TNewItemSchema>,
): i is Partial<TBaseSchema> => '_id' in i;

type Props<T> =
  | {
      type: 'new';
      item: Partial<TNewItemSchema>;
    }
  | {
      type: 'update';
      item: Partial<TBaseSchema>;
      onItemMutate: KeyedMutator<T>;
    };

export const ViewItem = <Model extends {}>(props: Props<Model>) => {
  const toast = useToast();
  const configRes = useConfig();
  const model = useModel();
  const router = useRouter();
  const [putResults, putItem] = usePut<Model>();
  const [postResults, postItem] = usePost<Model>();
  const isUpdating = putResults.isFetching || postResults.isFetching;
  const isNewItem = props.type === 'new';

  const dataFields = R.pipe(
    configRes.config,
    defaultTo<StoreleftConfig>({ dataDefinition: [] }),
    R.prop('dataDefinition'),
  );

  const formik = useFormik({
    initialValues: props.item,
    validationSchema: toFormikValidationSchema(
      isNewItem ? NewItemSchema : model,
    ),
    onSubmit: (doc) => {
      console.log('submitting');
      let p = Promise.resolve(isExistingItem(doc) ? putResults : postResults);
      if (isExistingItem(doc)) {
        p = putItem({ doc });
      } else {
        p = postItem({ doc });
      }
      p.then((res) => {
        if (res.error) {
          console.error(res.error);
          toast({
            variant: 'solid',
            status: 'error',
            title: 'Opps! Something went wrong',
            description: res.error.message,
          });
        } else if (res.data) {
          toast({
            variant: 'solid',
            status: 'success',
            title: 'Success',
            description: `Item updated to revision ${res.data.rev}`,
          });

          if ('onItemMutate' in props) {
            props.onItemMutate();
          }

          if (isNewItem && res.data.id) {
            router.push(`/items/${res.data.id}`);
          }
        } else {
          console.log('no update res?');
        }
      });
    },
  });

  const resetForm = useCallback(() => {
    console.log('props.item: ', props.item);
    formik.resetForm({ values: props.item });
  }, [props.item, formik.handleReset]);

  useEffect(() => {
    formik.resetForm({ values: props.item });
  }, [props.item, formik.resetForm]);

  if (configRes.error) {
    throw configRes.error;
  }

  const rev = isNewItem ? 'NEW' : props.item._rev;

  return (
    <VStack mb='8em' alignItems='stretch'>
      <VStack mb='2em' justify='stretch' align='flex-end' spacing='4'>
        <ButtonGroup size='md' spacing='2'>
          <Button
            variant='solid'
            colorScheme='green'
            disabled={!formik.dirty && formik.isValid}
            onClick={formik.handleSubmit as any}
            isLoading={isUpdating}
          >
            Save
          </Button>
          <Button variant='outline' colorScheme='red'>
            Delete
          </Button>
        </ButtonGroup>
        <ButtonGroup size='sm' spacing='4' colorScheme='cyan' variant='ghost'>
          <Button disabled={isNewItem}>Duplicate</Button>
          <Button disabled={isNewItem}>Add to Container</Button>
          <Button onClick={resetForm}>Reset</Button>
        </ButtonGroup>
      </VStack>
      <Form
        as='form'
        mb='2em'
        w='100%'
        mx='auto'
        sx={{ columnCount: { sm: 1, xl: 2 }, columnGap: '8', rowGap: '4' }}
        onSubmit={formik.handleSubmit}
      >
        <FormikProvider value={formik}>
          {dataFields.map((groupProps) => (
            <Group key={groupProps.displayName} {...groupProps} rev={rev} />
          ))}
        </FormikProvider>
      </Form>
    </VStack>
  );
};
