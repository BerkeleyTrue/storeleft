import _ from 'lodash/fp';
import * as R from 'remeda';
import { z, ZodTypeAny } from 'zod';

import { DataField, StoreLeftDataTypes, StoreleftConfig } from '../types';

const baseModel = {
  name: z.string(),
  _id: z.string(),
  location: z.string(),
};

const libraryStatus = z.object({
  status: z.boolean(),
  events: z
    .object({
      checkIn: z.boolean(),
      user: z.string(),
    })
    .array()
    .optional(),
});

interface IDataFieldTypeToZodMap {
  [key: string]: () => ZodTypeAny;
}
const dataFieldTypeToZodMap: IDataFieldTypeToZodMap = {
  libraryStatus: () => libraryStatus,
};

export const getZodFromType = (type: StoreLeftDataTypes) => {
  const zodTypeFactory = dataFieldTypeToZodMap[type] || z[type] || z.undefined;
  return zodTypeFactory();
};

export const dataFieldToNameZodTuble = ({
  name,
  type,
}: DataField): [string, ZodTypeAny] => [name, getZodFromType(type)];

export const generateModel = (config: StoreleftConfig) => {
  const userModel = R.pipe(
    config,
    R.prop('dataDefinition'),
    R.map(R.prop('fields')),
    R.flatten(),
    R.map(dataFieldToNameZodTuble),
    R.fromPairs,
    (userDef: Record<string, ZodTypeAny>) => z.object(userDef)
  );

  return userModel.extend(baseModel);
};
