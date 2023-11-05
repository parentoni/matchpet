export interface IAnimalDTO {
  _id: string;
  name: string;
  age: number;
  image: string[];
  created_at: Date;
  status: ANIMAL_STATUS;
  description: string;
  donator_id: string;
  specie_id: string;

  traits: IAnimalTraitsDTO[];
}

export enum ANIMAL_STATUS {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DONATED = "DONATED"
}


export interface IAnimalTraitsDTO {
  _id: string;
  value: string;
}