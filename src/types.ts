export type StoreLeftLibraryStatus = 'libraryStatus';
export type StoreLeftPath = 'path';
export type StoreLeftUpdatedAt = 'updatedAt';
export type StoreLeftList = 'list';

export const storeLeftPrimitiveTypes = ['string', 'boolean', 'date'] as const;
export type StoreLeftPrimitiveTypes = (typeof storeLeftPrimitiveTypes)[number]

export type StoreLeftDataTypes =
  | StoreLeftPrimitiveTypes
  | StoreLeftList
  | StoreLeftPath
  | StoreLeftLibraryStatus
  | StoreLeftUpdatedAt;

export interface SubDataField {
  name: string;
  type: StoreLeftDataTypes;
}

export interface DataField {
  /**
   * data field name
   */
  name: string;
  /**
   * name on forms
   */
  displayName: string;
  /**
   * Date type - one of StoreLeftDataTypes
   */
  type: StoreLeftDataTypes;
  /**
   * Make field non-editable
   */
  disabled: boolean;
  /**
   * Is field required?
   */
  isRequired: boolean;
  /**
   * Sub fields for certain types like list
   */
  dataFields: SubDataField[];

  showInTrue: boolean;
  hideInList: boolean;
  size: number;
  prefixes: { [key: string]: string };
}

export interface DataDefinition {
  /**
   * The group name in forms
   */
  displayName: string;
  /**
   * Fields for this data group
   */
  fields: DataField[];
  color: string;
}

export interface StoreleftConfig {
  dataDefinition: DataDefinition[];
}
