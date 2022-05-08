import _ from 'lodash/fp';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';

const getRowId = _.get('_id');

const data = [
  {
    _id: '8822aa2c-58e9-479f-8439-6157e4b2c522',
    _rev: '3-4186fe5f6d22184fb90902382de5bd3f',
    status: {
      checkInDate: '2022-05-07T06:43:13.735Z',
      checkInBy: 'Local',
      status: true,
    },
    location: 'test/shelf',
    name: 'Test Foo',
    type: 'item',
    lastModified: '2022-05-07T06:49:48.901Z',
    lastTouchDate: '2022-05-07T06:43:13.735Z',
  },
];

const columns: GridColDef[] = [
  { headerName: 'Id', field: '_id' },
  { headerName: 'Name', field: 'name', type: 'string' },
];

export const ItemList = () => {
  return (
    <Box height='500px' width='100%'>
      <DataGrid
        rows={data}
        getRowId={getRowId}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 50, 100, 1000]}
      />
    </Box>
  );
};
