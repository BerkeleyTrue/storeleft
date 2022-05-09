import _ from 'lodash/fp';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';

import { useAllDocs } from '../../lib/pouchdb/useAllDocs';

const getRowId = _.get('_id');

const columns: GridColDef[] = [
  { headerName: 'Id', field: '_id' },
  { headerName: 'Name', field: 'name', type: 'string' },
];

export const ItemList = () => {
  const [{ data }] = useAllDocs({ query: { skip: 0, limit: 100, include_docs: true } });
  const rows = _.flow(_.get('rows'), _.map('doc'))(data);

  return (
    <Box height='500px' width='100%'>
      <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 50, 100, 1000]}
      />
    </Box>
  );
};
