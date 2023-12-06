import { left } from "../../../../../shared/core/Result";
import { AuthenticatedRequest } from "../../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetAllCategoriesUseCase } from "./getAllCategoriesUseCase";

export class GetAllCategoriesController extends BaseController<AuthenticatedRequest> {
  constructor(getAllCategoriesUseCase: GetAllCategoriesUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const useCaseResult = await getAllCategoriesUseCase.execute();
      if (useCaseResult.isLeft()) {
        return this.errorHandler(res, useCaseResult.value);
      }

      return this.ok(res, useCaseResult.value);
    });
  }
}
