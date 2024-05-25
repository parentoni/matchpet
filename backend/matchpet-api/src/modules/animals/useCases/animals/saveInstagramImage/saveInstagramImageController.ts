import { AuthenticatedRequest } from "../../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { SaveInstagramImageUseCase } from "./saveInstagramImageUseCase";
import { SaveInstagramImageDTO } from "./saveInstagramImageDTO";

export class SaveInstagramImageController extends BaseController<AuthenticatedRequest> {
  constructor(saveInstagramImageUseCase: SaveInstagramImageUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const dto = req.body as SaveInstagramImageDTO;

      const result = await saveInstagramImageUseCase.execute(dto);
      if (result.isLeft()) {
        return this.errorHandler(res, result.value);
      }

      return this.ok(res, result.value);
    });
  }
}
