export interface IAnimalDTO {
  _id: string;
  name: string;
  image: string[];
  status: ANIMAL_STATUS;
  description: string;
  donator_id: string;
  specie_id: string;
  traits: IAnimalTraitsDTO[];
  views: number;
  clicks:number;

  created_at: Date;
  last_modified_at: string;
}

export enum ANIMAL_STATUS {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DONATED = "DONATED"
}

export const PrintableAnimalStatus: Record<ANIMAL_STATUS, string> ={
  "CANCELED": "Cancelado",
  "PENDING": "Em adoção",
  "DONATED": "Doado"
}

export interface IAnimalTraitsDTO {
  _id: string;
  value: string;
}
