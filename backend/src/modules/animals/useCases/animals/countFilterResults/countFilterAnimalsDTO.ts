import { FilterObject } from "../filterAnimals/filterAnimalsDTO";

export interface CountFilterAnimalsDTO {
  filter: FilterObject[];
  coordinates?: GeoJSON.Position[][];
}
