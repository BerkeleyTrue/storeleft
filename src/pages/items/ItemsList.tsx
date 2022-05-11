import _ from 'lodash/fp';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { Column, ColumnGroup, Row, useTable } from 'react-table';
import { useRouter } from 'next/router';
import {
  Heading,
  Table,
  Thead,
  Tbody,
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

type AccessorFactory = (field: string) => (row: DataField) => any;

const createFieldValueAccessor: AccessorFactory = (field) => (row) =>
  _.get(field, row);

const formatDate = (date: string) => dayjs(date).format('YYYY/MM/DD HH:MM');

const accessorFactoryMap: { [key: string]: AccessorFactory } = {
  libraryStyleStatus: (field) =>
    _.flow(createFieldValueAccessor(field), (isCheckedIn) =>
      isCheckedIn ? 'Checked In' : 'Checked Out'
    ),
  list: (field) => _.flow(createFieldValueAccessor(field), _.join('\n')),
  lastModified: (field) => _.flow(createFieldValueAccessor(field), formatDate),
  lastDate: (field) => _.flow(createFieldValueAccessor(field), formatDate),
};

export const TableRow = ({
  getRowProps,
  cells,
  original,
}: Row) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/items/${(original as any)._id}`);
  }, [router]);
  return (
    <Tr {...getRowProps()} onClick={handleClick}>
      {cells.map((cell) => (
        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
      ))}
    </Tr>
  );
};
export const ItemList = () => {
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
              accessor: (accessorFactoryMap[type]
                ? accessorFactoryMap[type](name)
                : name) as any,
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
                  <Th align='center' {...getHeaderProps()}>
                    {render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const { key } = row.getRowProps();
              return <TableRow key={key} {...row}/>;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
