import _ from 'lodash/fp';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  TableCaption,
} from '@chakra-ui/react';

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
    <VStack>
      <Heading>Items</Heading>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </VStack>
  );
};
