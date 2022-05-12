import _ from 'lodash/fp';
import { z } from 'zod';

import { DataField } from '../types';
import { useConfig } from '../services/use-config';

export const useModel = () => {
  const configRes = useConfig();
  if (configRes.error || !configRes.data) {
    return z.object({});
  }
  const config = configRes.data;
  const model = _.flow(
    _.get('dataDefinition'),
    _.map(
      _.flow(
        _.get('fields'),
        _.map(({ name, type }: DataField) => ({
          [name]: z[type](),
        }))
      )
    )
  )(config);
};
