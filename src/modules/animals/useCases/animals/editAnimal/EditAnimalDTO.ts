import { IAnimalPersistent, IAnimalTraitsPersistent } from "../../../../../shared/infra/database/models/Animal";
import { JWTDTO } from "../../../../user/domain/jwt";
import { IAuthService } from "../../../../user/services/IauthService";
import { ANIMAL_STATUS } from "../../../domain/animal/AnimalStatus";

export interface EditAnimalTraits {
  name: string;
  image: string[];
  status: ANIMAL_STATUS;
  description: string;
  traits: IAnimalTraitsPersistent[];
}
export interface EditAnimalDTO {
  user: JWTDTO;
  animal: string;
  edit: Partial<EditAnimalTraits>;
}
