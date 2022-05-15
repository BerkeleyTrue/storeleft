import _ from 'lodash/fp';
import * as R from 'remeda';
import { z, ZodTypeAny } from 'zod';

import {
  DataField,
  StoreLeftDataTypes,
  StoreleftConfig,
  StoreLeftPrimitiveTypes,
  storeLeftPrimitiveTypes,
} from '../types';

const zDateFactory = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
}, z.date());

const libraryStatusEvents = z
    .object({
      checkIn: z.boolean(),
      user: z.string(),
      date: z.union([z.date(), z.string()]),
    })
    .array()

export type TLibraryStatusEvents = z.infer<typeof libraryStatusEvents>;

const libraryStatus = z.object({
  status: z.boolean().default(false),
  events: libraryStatusEvents.optional(),
});

export type TLibraryStatus = z.infer<typeof libraryStatus>;

interface IDataFieldTypeToZodMap {
  [key: string]: () => ZodTypeAny;
}
const dataFieldTypeToZodMap: IDataFieldTypeToZodMap = {
  libraryStatus: () => libraryStatus,
  updatedAt: () => zDateFactory,
  path: z.string,
  list: () => z.string().array(),
};

const isPrimitiveType = (
  fieldType: StoreLeftDataTypes,
): fieldType is StoreLeftPrimitiveTypes =>
  (storeLeftPrimitiveTypes as ReadonlyArray<string>).includes(fieldType);

export const getZodFromType = (fieldType: StoreLeftDataTypes) => {
  let zodTypeFactory = dataFieldTypeToZodMap[fieldType];

  if (!zodTypeFactory && isPrimitiveType(fieldType)) {
    zodTypeFactory = z[fieldType];
  }

  if (!zodTypeFactory) {
    zodTypeFactory = z.undefined;
  }

  if (zodTypeFactory === z.undefined) {
    console.log(
      `Expected type for ${fieldType}: but found none, using undefined`,
    );
  }

  return zodTypeFactory();
};

export const dataFieldToNameZodTuble = ({
  name,
  type,
}: DataField): [string, ZodTypeAny] => [name, getZodFromType(type)];

export const modDatafieldOptional = (
  { isRequired }: DataField,
  zType: ZodTypeAny,
) => (isRequired ? zType : zType.optional());

export const forkJoinDataField = (
  dataField: DataField,
): [string, ZodTypeAny] => {
  const [key, zType] = dataFieldToNameZodTuble(dataField);

  return [key, modDatafieldOptional(dataField, zType)];
};

export const BaseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  location: z.string(),
  _rev: z.string(),
});

export type TBaseSchema = z.infer<typeof BaseSchema>;
export const generateModel = (config: StoreleftConfig) => {
  const UserSchema = R.pipe(
    config,
    R.prop('dataDefinition'),
    R.map(R.prop('fields')),
    R.flatten(),
    R.map(forkJoinDataField),
    R.fromPairs,
    (userDef: Record<string, ZodTypeAny>) => z.object(userDef),
  );

  return UserSchema.merge(BaseSchema);
};
