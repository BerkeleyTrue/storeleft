import * as R from 'remeda';
import dayjs from 'dayjs';
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
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { PathInput } from './PathInput';
import { DatePicker } from './date';
import { ListField } from './List';
import { LibraryStatus } from './LibraryStatus';

import { TBaseSchema } from '../../../model/model';
import { useConfig } from '../../../services/config/use-config';
import { useModel } from '../../../model/use-model';

const Form = chakra('form');

interface Props {
  item: Partial<TBaseSchema>;
}

export const ItemView = ({ item }: Props) => {
  const configRes = useConfig();
  const model = useModel();

  if (configRes.error) {
    throw configRes.error;
  }

  const dataFields = R.pipe(
    configRes.config,
    (x) => x || { dataDefinition: [] },
    R.prop('dataDefinition'),
  );

  const formik = useFormik({
    initialValues: item,
    validationSchema: toFormikValidationSchema(model),
    onSubmit: (values) => {
      console.log('values: ', values);
    },
  });

  return (
    <VStack mb='8em' alignItems='stretch'>
      <VStack mb='2em' justify='stretch' align='flex-end' spacing='4'>
        <ButtonGroup size='md' spacing='2'>
          <Button
            variant='solid'
            colorScheme='green'
            disabled={!formik.dirty && formik.isValid}
            onClick={formik.handleSubmit as any}
          >
            Save
          </Button>
          <Button variant='outline' colorScheme='red'>
            Delete
          </Button>
        </ButtonGroup>
        <ButtonGroup size='sm' spacing='4' colorScheme='cyan' variant='ghost'>
          <Button>Duplicate</Button>
          <Button>Add to Container</Button>
          <Button onClick={formik.handleReset}>Reset</Button>
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
          {dataFields.map(({ displayName, fields }) => (
            <Box
              w='full'
              maxW='2xl'
              mx='auto'
              mb='10'
              px={4}
              py={3}
              bg='gray.700'
              shadow='md'
              rounded='md'
              key={displayName}
            >
              <Flex justifyContent='flex-start' alignItems='center'>
                <Box
                  as='span'
                  bg='brand.300'
                  color='brand.900'
                  px={3}
                  py={1}
                  rounded='full'
                  textTransform='uppercase'
                  fontSize='xs'
                >
                  {displayName}
                </Box>
              </Flex>
              <Stack px={4} py={5} spacing={6} p={{ sm: 6 }}>
                {fields.map(({ displayName, type, name, disabled }) => (
                  <FormControl as={GridItem} colSpan={[6, 3]} key={name}>
                    <FormLabel
                      htmlFor={name}
                      fontSize='sm'
                      fontWeight='md'
                      color='gray.50'
                    >
                      {displayName}
                    </FormLabel>
                    {type === 'string' && (
                      <Input
                        type={type}
                        name={name}
                        id={name}
                        disabled={disabled}
                        onChange={formik.handleChange}
                        value={(formik.values as any)[name]}
                        focusBorderColor='brand.400'
                        mt='1'
                        rounded='md'
                        shadow='sm'
                        size='sm'
                        w='full'
                      />
                    )}
                    {type === 'updatedAt' && (
                      <Input
                        type='text'
                        name={name}
                        id={name}
                        disabled={true}
                        value={dayjs((formik.values as any)[name]).format(
                          'YYYY/MM/DD-HH:MM',
                        )}
                        focusBorderColor='brand.400'
                        mt='1'
                        rounded='md'
                        shadow='sm'
                        size='sm'
                        w='full'
                      />
                    )}
                    {type === 'path' && (
                      <PathInput
                        type={type}
                        name={name}
                        disabled={disabled}
                        onChange={formik.handleChange}
                        value={(formik.values as any)[name]}
                      />
                    )}
                    {type === 'date' && (
                      <DatePicker disabled={disabled} id={name} name={name} />
                    )}
                    {type === 'list' && (
                      <ListField
                        disabled={disabled}
                        name={name}
                        list={(formik.values as any)[name]}
                      />
                    )}
                    { type === 'libraryStatus' && (
                      <LibraryStatus name={name} />
                    )}
                  </FormControl>
                ))}
              </Stack>
            </Box>
          ))}
        </FormikProvider>
      </Form>
    </VStack>
  );
};
