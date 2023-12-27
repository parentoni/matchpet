import { AuthenticatedRequest } from "../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserAnimalsStatsUseCase } from "./getUserAnimalsStatsUseCase";

export class GetUserAnimalsStatsController extends BaseController<AuthenticatedRequest> {
  constructor(useCase: GetUserAnimalsStatsUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const result = await useCase.execute({ user: req.decoded });
      if (result.isLeft()) {
        return this.errorHandler(res, result.value);
      }
      return this.ok(res, result.value);
    });
  }
}
