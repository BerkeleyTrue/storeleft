import {
  SimpleGrid,
  Box,
  Stack,
  Flex,
  Button,
  Heading,
} from '@chakra-ui/react';

interface Props {
  itemId: string;
}

export const ViewItem = ({}: Props) => {
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
