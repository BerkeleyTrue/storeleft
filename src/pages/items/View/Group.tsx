import { memo } from 'react';

import { Box, Stack, Flex, Badge, Spacer } from '@chakra-ui/react';
import { Field } from './Field';
import { DataField } from '../../../types';

type Props = {
  displayName: string;
  fields: DataField[];
  rev?: string;
};

export const Group = memo(({ displayName, rev, fields }: Props) => {
  return (
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
        {displayName == 'Main' && (
          <>
            <Spacer />
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
              <Badge>rev: {rev}</Badge>
            </Box>
          </>
        )}
      </Flex>
      <Stack px={4} py={5} spacing={6} p={{ sm: 6 }}>
        {fields.map(({ displayName, type, name, disabled }) => (
          <Field
            key={name}
            type={type}
            displayName={displayName}
            name={name}
            disabled={disabled}
          />
        ))}
      </Stack>
    </Box>
  );
});

Group.displayName = 'DataDefinitionGroup';
