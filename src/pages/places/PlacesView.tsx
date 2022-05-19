import * as R from 'remeda';
import { useMemo, useState } from 'react';
import { VStack, Text, Flex, Box } from '@chakra-ui/react';

import { useQuery } from '../../lib/pouchdb/useQuery';

type Paths = [string[]];

interface Props {}

export const PlacesView = ({}: Props) => {
  const queryResponse = useQuery<Paths>({ fun: 'storeleft/containers' });
  const [idx, setIdx] = useState(0);

  const list = useMemo<string[]>(() => {
    const pathTree: Paths =
      queryResponse?.data?.rows?.[0]?.value || ([] as string[]);
    return R.uniq(pathTree?.[idx] || []);
  }, [queryResponse.data, idx]);

  return (
    <VStack>
      <Flex>
        {list.map((path) => (
          <Box key={path}>
            <Text>{path}</Text>
          </Box>
        ))}
      </Flex>
    </VStack>
  );
};
