import { Request } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { VerifyUserDTO } from "./verifyUserDTO";
import { VerifyUserUseCase } from "./verifyUserUseCase";

export class VerifyUserController extends BaseController<Request> {
  constructor(useCase: VerifyUserUseCase) {
    super();
    this.versionRegister.addToRegister('1.0.0', async (req, res) => {
      const dto = req.body as VerifyUserDTO
      const useCaseResponse = await useCase.execute(dto)
      if (useCaseResponse.isLeft()) {
        return this.errorHandler(res, useCaseResponse.value)
      }

      return this.ok(res, useCaseResponse.value)
    })
  }
}