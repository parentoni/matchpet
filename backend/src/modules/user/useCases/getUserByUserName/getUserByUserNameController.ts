import { Request } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserByUserNameUseCase } from "./getUserByUserNameUseCase";
import { GetUserByUserNameDTO } from "./getUserByUserNameDTO";
import { left, right } from "../../../../shared/core/Result";

export class GetUserByUserNameController extends BaseController<Request> {
  constructor(useCase: GetUserByUserNameUseCase) {
    super();
    this.versionRegister.addToRegister('1.0.0', async (req, res) => {
      const dto = req.body as GetUserByUserNameDTO

      const useCaseResult = await useCase.execute(dto)
      if (useCaseResult.isLeft()){
        return this.errorHandler(res, useCaseResult.value)
      }

      return this.ok(res, useCaseResult.value)
    })


  }
}