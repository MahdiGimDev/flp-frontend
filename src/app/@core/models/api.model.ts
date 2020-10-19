export interface BasicModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiModel extends BasicModel {
  name: string;
  endpoint: string;
  database: string;
  parameters?: Array<ParamsModel>;
  fields?: Array<FieldModel>;
  activated?: boolean;
}

export interface ParamsModel extends BasicModel {
  name: string;
  value: string;
}

export interface FieldModel extends BasicModel {
  name: string;
  type?: string;
  description?: string;
}

export interface ApiCreateModel {
  id?: number;
  name: string;
  endpoint: string;
  database: string;
  params?: Array<ParamsModel>;
  fields?: Array<any>;
}

export interface CollectionModel {
  name: string;
  schema: any;
}

export interface ApiDocumentationMode {
  title: string;
  result: any;
  url: string;
  fields: Array<FieldModel>;
}

export const unusedFields = ['_id', '__v'];
