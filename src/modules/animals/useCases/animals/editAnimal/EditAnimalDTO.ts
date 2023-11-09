import { IAnimalPersistent } from "../../../../../shared/infra/database/models/Animal";
import { JWTDTO } from "../../../../user/domain/jwt";
import { IAuthService } from "../../../../user/services/IauthService";

export interface EditAnimalDTO {
  user: JWTDTO;
  animal: string;
  edit: Partial<IAnimalPersistent>;
}
