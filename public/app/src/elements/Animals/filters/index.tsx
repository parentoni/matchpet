import { AnimalFiltersRoot } from "./AnimalFiltersRoot";
import { ChoiceFilter } from "./ChoiceFIlter";
import { SlideFilter } from "./SlideFilter";

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


export const AnimalFilters = {
  Root: AnimalFiltersRoot,
  ChoiceFilter: ChoiceFilter,
  SlideFilter: SlideFilter
}