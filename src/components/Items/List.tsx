import _ from 'lodash/fp';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';

import { useAllDocs } from '../../lib/pouchdb/useAllDocs';
import { useItemHeaders } from '../../services/config/use-headers';

const getRowId = _.get('_id');

export const ItemList = () => {
  const [{ data }] = useAllDocs({
    query: { skip: 0, limit: 100, include_docs: true },
  });

  const headers = useItemHeaders();

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
      />
    </Box>
  );
};
