export interface IAnimalDTO {
  _id: string;
  name: string;
  age: number;
  image: string[];
  created_at: Date;
  status: string;
  description: string;
  donator_id: string;
  specie_id: string;

  traits: IAnimalTraitsDTO[];
}

export interface IAnimalTraitsDTO {
  _id: string;
  value: string;
}