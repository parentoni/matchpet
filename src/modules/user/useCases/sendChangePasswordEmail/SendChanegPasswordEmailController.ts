import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request } from "express";
import { SendChangePasswordEmailUseCase } from "./SendChangePasswordEmailUseCase";
import { SendPasswordChangeEmailDTO } from "./SendChangePasswordEmailDTO";

export class SendChangePasswordEmailController extends BaseController<Request> {
  constructor(sendChangePasswordEmailuseCase: SendChangePasswordEmailUseCase) {
    super()
    this.versionRegister.addToRegister('1.0.0', async (req, res) => {
      const dto = req.body as SendPasswordChangeEmailDTO
      console.log(dto)
      const response = await sendChangePasswordEmailuseCase.execute(dto)
      if (response.isLeft()) {
        return this.errorHandler(res, response.value)
      }

      this.ok(res, response.value)
    })
  }
}