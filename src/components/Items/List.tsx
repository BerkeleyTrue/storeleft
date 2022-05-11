import _ from 'lodash/fp';
import { useMemo } from 'react';
import { Accessor, Column, ColumnGroup, useTable } from 'react-table';
// import { useRouter } from 'next/router';
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
import { useConfig } from '../../services/config/use-config';
import { DataDefinition, DataField } from '../../types';
import dayjs from 'dayjs';

type AccessorFactory = (field: string) => (row: DataField) => any

const createFieldValueAccessor: AccessorFactory = (field) => (row) => _.get(field, row);

const formatDate = (date: string) => dayjs(date).format('YYYY/MM/DD HH:MM');

const accessorFactoryMap: { [key: string]: AccessorFactory } =
  {
    libraryStyleStatus: (field) => _.flow(createFieldValueAccessor(field), (isCheckedIn) =>
      isCheckedIn ? 'Checked In' : 'Checked Out'
    ),
    list: (field) => _.flow(createFieldValueAccessor(field), _.join('\n')),
    lastModified: (field) => _.flow(createFieldValueAccessor(field), formatDate),
    lastDate: (field) => _.flow(createFieldValueAccessor(field), formatDate),
  };

export const ItemList = () => {
  // const router = useRouter();
  const allDocs = useAllDocs({
    query: { limit: 100, skip: 0, include_docs: true },
  });

  const data = useMemo(() => {
    return _.flow(
      _.get('rows'),
      _.map('doc'),
      _.filter({ type: 'item' })
    )(allDocs.data);
  }, [allDocs.data]);

  const configFetch = useConfig();
  const columns = useMemo<Column[]>(() => {
    return _.flow(
      _.get('dataDefinition'),
      _.map(
        ({ displayName, fields }: DataDefinition): ColumnGroup => ({
          Header: displayName,
          columns: _.map(
            ({ displayName, name, type }: DataField) => ({
              Header: displayName,
              accessor: accessorFactoryMap[type] ? accessorFactoryMap[type](name) : name,
            }),
            fields
          ),
        })
      )
    )(configFetch.config);
  }, [configFetch.config]);

  const { headerGroups, getTableProps, getTableBodyProps, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <VStack>
      <Heading>Items</Heading>
      <TableContainer>
        <Table variant='striped' {...getTableProps()}>
          <TableCaption>Items in Storage</TableCaption>
          <Thead>
            {headerGroups.map(({ getHeaderGroupProps, headers }) => (
              <Tr {...getHeaderGroupProps()}>
                {headers.map(({ getHeaderProps, render }) => (
                  <Th align='center' {...getHeaderProps()}>{render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
