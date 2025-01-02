import { SEX } from "../../domain/Animal";

export interface IAnimalDTO {
  _id: string;
  name: string;
  image: string[];
  imageExport : string[],
  status: ANIMAL_STATUS;
  description: string;
  donator_id: string;
  specie_id: string;
  traits: IAnimalTraitsDTO[];
  views: number;
  clicks:number;

  created_at: Date;
  last_modified_at: string;
  contact: {
    contact_type: string
    contact_value: string
  }[],
  sex: SEX
}

export enum ANIMAL_STATUS {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DONATED = "DONATED",
  AUTO_CANCELED = "AUTO_CANCELED"
}

export const PrintableAnimalStatus: Record<ANIMAL_STATUS, string> ={
  "CANCELED": "Cancelado",
  "PENDING": "Em adoção",
  "DONATED": "Doado",
  "AUTO_CANCELED": "Cancelado automaticamente"
}

export interface IAnimalTraitsDTO {
  _id: string;
  value: string;
}
