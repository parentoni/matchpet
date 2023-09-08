export interface FilterAnimalsDTO {
  filter: FilterObject[];
  page: number;
}

export interface FilterObject {
  key: string;
  comparation_value: any;
  mode: FILTER_MODES;
}

export enum FILTER_MODES {
  EQUAL = "$eq",
  GREATHER_THAN = "$gt",
  GREATHER_THAN_EQUAL = "$gte",
  LESS_THAN = "$lt",
  LESS_THAN_EQUAL = "$lte",
  IN = "$in",
  NOT_EQUAL = "$ne",
  NOT_IN = "$nin"
}
