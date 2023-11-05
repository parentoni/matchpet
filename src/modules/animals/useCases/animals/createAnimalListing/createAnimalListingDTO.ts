export interface CreateAnimalListingDTO {
  name: string;
  image: string[];
  age: number;
  donatorId: string;
  specie_id: string;
  traits: CreateAnimalListingTraitsDTO[];
  description: string;
}

export interface CreateAnimalListingTraitsDTO {
  _id: string;
  value: string;
}
