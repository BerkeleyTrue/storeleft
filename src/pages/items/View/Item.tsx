import * as R from 'remeda';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { KeyedMutator } from 'swr';
import { chakra } from '@chakra-ui/system';
import { Button, VStack, ButtonGroup, useToast } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Group } from './Group';
import {
  LibraryStatusSchema,
  NewItemSchema,
  TBaseSchema,
  TDataTypes,
  TNewItemSchema,
} from '../../../model/model';
import { useConfig } from '../../../application/config/use-config';
import { useModel } from '../../../model/use-model';
import { usePut, usePost } from '../../../lib/pouchdb';
import { defaultTo } from '../../../lib/remeda/defaultTo';
import { StoreleftConfig, StoreLeftDataTypes } from '../../../types';

const Form = chakra('form');

const isExistingItem = (
  i: Partial<TBaseSchema> | Partial<TNewItemSchema>,
): i is Partial<TBaseSchema> => '_id' in i;

const typeToInitialValueMap: { [K in StoreLeftDataTypes]: () => TDataTypes } = {
  string: () => '',
  boolean: () => false,
  path: () => '/',
  date: () => new Date(),
  updatedAt: () => new Date().toISOString(),
  list: () => [] as string[],
  libraryStatus: () => LibraryStatusSchema.parse({}),
};

type Props<T> =
  | {
      type: 'new';
      item: TNewItemSchema;
    }
  | {
      type: 'duplicate';
      item: Partial<TBaseSchema>;
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

  const [dataFields, initialValues] = useMemo(() => {
    const dataFields = R.pipe(
      configRes.config,
      defaultTo<StoreleftConfig>({ dataDefinition: [] }),
      R.prop('dataDefinition'),
    );
    const initialValues = R.pipe(
      dataFields,
      R.map(R.prop('fields')),
      R.flatten(),
      R.map(({ name, type }): [string, TDataTypes] => [
        name,
        typeToInitialValueMap[type](),
      ]),
      R.fromPairs,
    );

    return [dataFields, R.merge(initialValues, props.item)];
  }, [configRes.config, props.item]);

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(
      isNewItem ? NewItemSchema : model,
    ),
    onSubmit: (doc) => {
      let p = Promise.resolve(isExistingItem(doc) ? putResults : postResults);
      if (isExistingItem(doc) && doc._id) {
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
    formik.resetForm({ values: initialValues });
  }, [formik, initialValues]);

  useEffect(() => {
    formik.resetForm({ values: initialValues });
  }, [formik, initialValues]);

  const _id = isNewItem ? '' : props.item?._id;
  const duplicate = useCallback(() => {
    if (isNewItem) {
      return;
    }
    router.push(
      `/items/duplicate?itemId=${encodeURIComponent(_id || '')}`,
    );
  }, [router, isNewItem, _id]);

  const location = !isNewItem && props.item?.location || '';

  const addToContainer = useCallback(() => {
    if (isNewItem) {
      return;
    }

    router.push(
      `/items/add-to?location=${encodeURIComponent(location)}`,
    );
  }, [router, isNewItem, location]);

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
          <Button disabled={props.type !== 'update'} onClick={duplicate}>
            Duplicate
          </Button>
          <Button disabled={isNewItem} onClick={addToContainer}>
            Add to Container
          </Button>
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
