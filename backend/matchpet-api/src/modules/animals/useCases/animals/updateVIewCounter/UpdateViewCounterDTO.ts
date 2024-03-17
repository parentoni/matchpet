import { Animal } from "../../../domain/Animal";

// Passed entity for optimization reasons
export interface UpdateViewCounterDTO {
  animals: Animal[];
}
