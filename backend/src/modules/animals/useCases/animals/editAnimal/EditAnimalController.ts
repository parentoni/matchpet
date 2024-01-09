import { IAnimalPersistent } from "../../../../../shared/infra/database/models/Animal";
import { AuthenticatedRequest } from "../../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { EditAnimalTraits } from "./EditAnimalDTO";
import { EditAnimalUseCase } from "./EditAnimalUseCase";

export class EditAnimalController extends BaseController<AuthenticatedRequest> {
  constructor(useCase: EditAnimalUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const { id } = req.params as { id: string };
      const user = req.decoded;
      const body = req.body as { edit: Partial<EditAnimalTraits> };

      const response = await useCase.execute({
        animal: id,
        user: user,
        edit: body.edit
      });

      if (response.isLeft()) {
        return this.errorHandler(res, response.value);
      }

      return this.ok(res, response.value);
    });
  }
}
