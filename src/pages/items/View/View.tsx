import {
  SimpleGrid,
  Box,
  Stack,
  Flex,
  Button,
  Heading,
} from '@chakra-ui/react';
import { O } from 'ts-toolbelt';

import { TBaseSchema } from '../../../model/model';

interface Props {
  item: Partial<TBaseSchema>;
}

export const ViewItem = ({ item }: Props) => {
  return (
    <Flex mb='8em'>
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
      <SimpleGrid mb='2em'>
        <Box mb='2em'>
          FOo
        </Box>
      </SimpleGrid>
    </Flex>
  );
};
