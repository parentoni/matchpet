import { Response } from "express";
import { AuthenticatedRequest } from "../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AccessAsUserUseCase } from "./accessAsUserUseCase";
import { AccessAsUserDTO } from "./accessAsUserDTO";

/**
 * 
 * @class AccessAsUserController
 * @classdesc HTTP Controler for access as user usecase.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class AccessAsUserController extends BaseController<AuthenticatedRequest> {
  constructor(useCase: AccessAsUserUseCase) {
    super()
    this.versionRegister.addToRegister('1.0.0', async (req: AuthenticatedRequest, res: Response) => {
      const dto = req.body as AccessAsUserDTO

      const response = await useCase.execute(dto)
      if (response.isLeft()) {
        return this.errorHandler(res, response.value)
      }

      return this.ok(res, response.value)
    })
  }
}
