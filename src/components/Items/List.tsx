import _ from 'lodash/fp';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { Box } from '@mui/system';

import { useAllDocs } from '../../lib/pouchdb/useAllDocs';
import { useItemHeaders } from '../../services/config/use-headers';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const getRowId = _.get('_id');

export const ItemList = () => {
  const router = useRouter();
  const { data, error } = useAllDocs({ query: { limit: 100, skip: 0, include_docs: true }});

  if (error) {
    throw error;
  }

  const headers = useItemHeaders();
  const handleRowClick = useCallback(({ id }: GridRowParams) => {
    router.push(`/items/${id}`);
  }, [router]);

  const rows = _.flow(
    _.get('rows'),
    _.map('doc'),
    _.filter({ type: 'item' }),
  )(data);

  return (
    <Box height='500px' width='100%' px="1em">
      <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={headers}
        pageSize={10}
        rowsPerPageOptions={[10, 50, 100, 1000]}
        onRowClick={handleRowClick}
      />
    </Box>
  );
};
