export type StoreLeftLibraryStatus = 'string';
export type StoreLeftPath = 'string';
export type StoreLeftUpdatedAt = 'date';
export type StoreLeftList = 'array';

export type StoreLeftDataTypes =
  | 'string'
  | 'boolean'
  | 'date'
  | StoreLeftList
  | StoreLeftPath
  | StoreLeftLibraryStatus
  | StoreLeftUpdatedAt;

export interface SubDataField {
  name: string;
  type: StoreLeftDataTypes;
}

export interface DataField {
  name: string;
  displayName: string;
  type: StoreLeftDataTypes;
  disabled: boolean;
  isRequired: boolean;
  showInTrue: boolean;
  hideInList: boolean;
  size: number;
  prefixes: { [key: string]: string };
  dataFields: SubDataField[];
}

export interface DataDefinition {
  displayName: string;
  color: string;
  fields: DataField[];
}

export interface StoreleftConfig {
  dataDefinition: DataDefinition[];
}
