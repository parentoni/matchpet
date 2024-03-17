import { IAnimalTraitsPersistent } from "../../../../../shared/infra/database/models/Animal";
import { JWTDTO } from "../../../../user/domain/jwt";
import { ANIMAL_SEX } from "../../../domain/animal/AnimalSex";
import { ANIMAL_STATUS } from "../../../domain/animal/AnimalStatus";

export interface EditAnimalTraits {
  name: string;
  image: string[];
  status: ANIMAL_STATUS;
  description: string;
  sex: ANIMAL_SEX;
  traits: IAnimalTraitsPersistent[];
}
export interface EditAnimalDTO {
  user: JWTDTO;
  animal: string;
  edit: Partial<EditAnimalTraits>;
}
