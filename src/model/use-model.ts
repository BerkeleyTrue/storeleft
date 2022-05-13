import _ from 'lodash/fp';

import { useConfig } from '../services/config/use-config';
import { useMemo } from 'react';
import { generateModel } from './model';

export const useModel = () => {
  const configRes = useConfig();
  return useMemo(
    () =>
      configRes.error || !configRes.data
        ? undefined
        : generateModel(configRes.data),
    [configRes.data, configRes.error]
  );
};
