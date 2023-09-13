import { AuthenticatedRequest } from "../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateCategoryDTO } from "./createCategoryDTO";
import { CreateCategoryUseCase } from "./createCategoryUseCase";

export class CreateCategoryController extends BaseController<AuthenticatedRequest> {
  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    super()
    this.versionRegister.addToRegister('1.0.0', async (req, res) => {
      const dto = req.body as CreateCategoryDTO
      const response = await createCategoryUseCase.execute(dto)
      if (response.isLeft()) {
        return this.errorHandler(res, response.value)
      }

      this.ok(res, response.value)
    })
  }
}