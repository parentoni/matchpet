import { ContactProps } from "../../../../../shared/core/Contact";
import { IContactPersistent } from "../../../../../shared/infra/database/models/Animal";
import { JWTDTO } from "../../../../user/domain/jwt";

export interface CreateAnimalListingDTO {
  name: string;
  image: string[];
  age: number;
  donatorId: string;
  specie_id: string;
  traits: CreateAnimalListingTraitsDTO[];
  description: string;
  contact?: IContactPersistent[]
}

export interface CreateAnimalListingTraitsDTO {
  _id: string;
  value: string;
}
