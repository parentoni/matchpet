import { IContactPersistent } from "../../../../../shared/infra/database/models/Animal";
import { ANIMAL_SEX } from "../../../domain/animal/AnimalSex";

export interface CreateAnimalListingDTO {
  name: string;
  image: string[];
  age: number;
  donatorId: string;
  specie_id: string;
  traits: CreateAnimalListingTraitsDTO[];
  description: string;
  contact?: IContactPersistent[];
  sex: ANIMAL_SEX
}

export interface CreateAnimalListingTraitsDTO {
  _id: string;
  value: string;
}
