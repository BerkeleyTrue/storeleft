import _ from 'lodash/fp';
import { z } from 'zod';
import { useMemo } from 'react';

import { generateModel } from './model';
import { useConfig } from '../services/config/use-config';

export const useModel = () => {
  const configRes = useConfig();
  return useMemo(() => {
    return configRes.error || !configRes.data
      ? z.object({})
      : generateModel(configRes.data);
  }, [configRes.data, configRes.error]);
};
