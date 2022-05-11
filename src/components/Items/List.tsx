import _ from 'lodash/fp';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Heading, Box } from '@chakra-ui/react';

import { useAllDocs } from '../../lib/pouchdb/useAllDocs';
import { useItemHeaders } from '../../services/config/use-headers';

export const ItemList = () => {
  const router = useRouter();
  const { data, error } = useAllDocs({
    query: { limit: 100, skip: 0, include_docs: true },
  });

  if (error) {
    return (
      <Box>
        <Heading>Error fetching data</Heading>
      </Box>
    );
  }

  const headers = useItemHeaders();

  const rows = _.flow(
    _.get('rows'),
    _.map('doc'),
    _.filter({ type: 'item' })
  )(data);

  return (
    <Box height='500px' width='100%' px='1em'>
      Foo
    </Box>
  );
};
