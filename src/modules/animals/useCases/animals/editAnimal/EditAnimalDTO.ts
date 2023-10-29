import { IAnimalDTO } from "../../../../../../public/app/src/utils/dtos/AnimalDTO";
import { JWTDTO } from "../../../../user/domain/jwt";
import { IAuthService } from "../../../../user/services/IauthService";

export interface EditAnimalDTO {
  user: JWTDTO,
  animal: string,
  edit: Partial<IAnimalDTO>
}