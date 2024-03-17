import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetAllUsersDTO } from "./getAllUsersDTO";
import { GetAllUsersUseCase } from "./getAllUsersUseCase";

/**
 * 
 * @class GetAllUsersController
 * @classdesc Get all users, intended only for admin usage
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class GetAllUsersController extends BaseController<AuthenticatedRequest> {

  constructor(useCase: GetAllUsersUseCase) {
    super()
    this.versionRegister.addToRegister('1.0.0', async (req: Request, res: Response) => {
      const dto = req.body as GetAllUsersDTO
      
      const response = await useCase.execute(dto)
      if (response.isLeft()) {
        return this.errorHandler(res, response.value)
      }

      return this.ok(res, response.value)
    })
  }
}
