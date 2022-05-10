export interface SubDataField {
  name: string;
  type: string;
}

export interface DataField {
  name: string;
  displayName: string;
  type: string;
  disabled: boolean;
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
