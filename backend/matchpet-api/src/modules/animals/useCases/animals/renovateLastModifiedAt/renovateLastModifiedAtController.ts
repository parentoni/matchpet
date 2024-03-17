import { left, right } from "../../../../../shared/core/Result";
import { AuthenticatedRequest } from "../../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { RenovateLastModifiedAtDTO } from "./renovateLastModifiedAtDTO";
import { RenovateLastModifiedAtUseCase } from "./renovateLastModifiedAtUseCase";

export class RenovateLastModifiedAtController extends BaseController<AuthenticatedRequest> {
  constructor(useCase: RenovateLastModifiedAtUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const dto = req.body as RenovateLastModifiedAtDTO;
      const response = await useCase.execute(dto);

      if (response.isLeft()) {
        return this.errorHandler(res, response.value);
      }

      return this.ok(res, { message: "OK" });
    });
  }
}
