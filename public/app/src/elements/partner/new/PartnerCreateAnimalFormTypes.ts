import { ANIMAL_STATUS } from "../../../utils/services/dtos/AnimalDTO";
import { Image } from "../../../utils/domain/Image";
export interface AnimalInput {
  name: AnimalInputValue<string>;
  description: AnimalInputValue<string>;
  status: AnimalInputValue<ANIMAL_STATUS>;
  specie_id: AnimalInputValue<string>;
  whatsapp: AnimalInputValue<string>;
  email: AnimalInputValue<string>;
}

export interface AnimalInputValue<T> {
  value: T;
  obrigatory: boolean;
}


export type AnimalInputTraitsErrors = Record<string, boolean>;
export type AnimalInputErrors = {
  [x in keyof AnimalInput]: boolean;
};

export type AnimalInputTraits = Record<string, string>;



export interface PartnerCreateAnimalFormProps {
  id: string;
  animalInput: AnimalInput;
  setAnimalInput: (animalInput: AnimalInput) => void;
  animalInputErrors: AnimalInputErrors;
  setAnimalInputErrors: (animalInputErrors: AnimalInputErrors) => void;
  animalInputTraits: AnimalInputTraits;
  setAnimalInputTraits: (animalInputTraits: AnimalInputTraits) => void;
  animalInputTraitsErrors: AnimalInputTraitsErrors;
  setAnimalInputTraitsErrors: (animalInputTraitsErrors: AnimalInputTraitsErrors) => void;
  images: Image[];
  setImages: (images: Image[]) => void;
  imagesError: boolean;
  setImagesError: (imagesError: boolean) => void;
  iAmTheContact: boolean;
  setIAmTheContact: (iAmTheContact: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
