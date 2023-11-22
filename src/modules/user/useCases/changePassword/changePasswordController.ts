import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request } from "express";
import { ChangePasswordUseCase } from "./changePasswordUseCase";
import { ChangePasswordDTO } from "./changePasswordDTO";
export class ChangePasswordController extends BaseController<Request> {
  constructor(useCase: ChangePasswordUseCase) {
    super()
    this.versionRegister.addToRegister('1.0.0', async (req, res) => {
      const dto = req.body as ChangePasswordDTO
      const response = await useCase.execute(dto)
      if (response.isLeft()) {
        return this.errorHandler(res, response.value)
      }

      this.ok(res, response.value)
    })
  }
}