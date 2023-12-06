import { AuthenticatedRequest } from "../../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CreateAnimalListingDTO } from "./createAnimalListingDTO";
import { CreateAnimalListingUseCase } from "./createAnimalListingUseCase";

export class CreateAnimalListingController extends BaseController<AuthenticatedRequest> {
  constructor(createAnimalListingUseCase: CreateAnimalListingUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const dto = req.body as CreateAnimalListingDTO;
      dto.donatorId = req.decoded.uid;

      const result = await createAnimalListingUseCase.execute(dto);
      if (result.isLeft()) {
        return this.errorHandler(res, result.value);
      }

      return this.ok(res, result.value);
    });
  }
}
