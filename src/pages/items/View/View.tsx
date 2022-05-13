import * as R from 'remeda';
import {
  chakra,
} from "@chakra-ui/system"
import {
  SimpleGrid,
  Box,
  Stack,
  Flex,
  Button,
  Heading,
  VStack,
  FormControl,
  GridItem,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import { TBaseSchema } from '../../../model/model';
import { useConfig } from '../../../services/config/use-config';

const Form = chakra('form');

interface Props {
  item: Partial<TBaseSchema>;
}

export const ItemView = ({ item }: Props) => {
  const configRes = useConfig();

  if (configRes.error) {
    throw configRes.error;
  }

  const dataFields = R.pipe(
    configRes.config,
    (x) => x || { dataDefinition: [] },
    R.prop('dataDefinition')
  );

  const formik = useFormik({
    initialValues: item,
    onSubmit: (values) => {
      console.log('values: ', values);
    }
  });

  return (
    <VStack mb='8em' alignItems='stretch'>
      <SimpleGrid mb='2em'>
        <Box>
          <Heading variant='h4'>View</Heading>
        </Box>
        <Box>
          <Stack direction='row' spacing={2}>
            <Button variant='contained' color='success'>
              Save
            </Button>
            <Button variant='contained' color='error'>
              Delete
            </Button>
          </Stack>
        </Box>
        <Box>
          <Stack direction='row' spacing={2}>
            <Button variant='outlined' color='info'>
              Duplicate
            </Button>
            <Button variant='outlined' color='info'>
              Add Another
            </Button>
          </Stack>
        </Box>
      </SimpleGrid>
      <Form
        as='form'
        mb='2em'
        w='100%'
        mx='auto'
        sx={{ columnCount: { sm: 1, xl: 2 }, columnGap: '8', rowGap: '4' }}
        onSubmit={formik.handleSubmit}
      >
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
                <FormControl as={GridItem} colSpan={[6, 3]}>
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
                      mt={1}
                      focusBorderColor='brand.400'
                      shadow='sm'
                      size='sm'
                      w='full'
                      disabled={disabled}
                      rounded='md'
                      onChange={formik.handleChange}
                      value={(formik.values as any)[name]}
                    />
                  )}
                  {type === 'path' && (
                    <Input
                      type={type}
                      name={name}
                      id={name}
                      mt={1}
                      focusBorderColor='brand.400'
                      shadow='sm'
                      size='sm'
                      w='full'
                      disabled={disabled}
                      rounded='md'
                    />
                  )}
                </FormControl>
              ))}
            </Stack>
          </Box>
        ))}
      </Form>
    </VStack>
  );
};
