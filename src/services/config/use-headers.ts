import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import _ from 'lodash/fp';
import { DataField } from '../../types';
import { useConfig } from './use-config';

const getFieldValue = ({ row, field }: GridValueGetterParams): any =>
  _.get(field, row);
const formatDate = (date: string) => dayjs(date).format('YYYY/MM/DD HH:MM');

const valueGetters: { [key: string]: (params: GridValueGetterParams) => any } =
  {
    libraryStyleStatus: _.flow(_.get('row.status.status'), (isCheckedIn) =>
      isCheckedIn ? 'Checked In' : 'Checked Out'
    ),
    list: _.flow(getFieldValue, _.join('\n')),
    lastModified: _.flow(getFieldValue, formatDate),
    lastDate: _.flow(getFieldValue, formatDate),
  };

export const useItemHeaders = (): GridColDef<DataField>[] => {
  const { config, error } = useConfig();
  if (error || !config) {
    return [];
  }

  return _.flow(
    _.get('dataDefinition'),
    _.map(
      _.flow(
        _.get('fields'),
        _.defaultTo({}),
        _.remove({ hideInList: true }),
        _.map(
          ({ name, displayName, type }: DataField): GridColDef => ({
            field: name,
            headerName: displayName,
            valueGetter: valueGetters[type],
            flex: 1,
            minWidth: 150,
          })
        )
      )
    ),
    _.flatten
  )(config);
};
