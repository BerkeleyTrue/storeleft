import _ from 'lodash/fp';
import { useMemo } from 'react';

import { BaseSchema, generateModel } from './model';
import { useConfig } from '../services/config/use-config';

export const useModel = () => {
  const configRes = useConfig();
  return useMemo(
    () => {
      const UserSchema = configRes.error || !configRes.data
        ? undefined
        : generateModel(configRes.data);
      return UserSchema || BaseSchema;
    },
    [configRes.data, configRes.error]
  );
};
