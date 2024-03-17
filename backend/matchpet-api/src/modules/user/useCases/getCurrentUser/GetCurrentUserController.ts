import { Response } from "express";
import { AuthenticatedRequest } from "../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserByUIDUseCase } from "../getUserByUID/getUserByUIDUseCase";
import { TokenFunctions } from "../../domain/jwt";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { GetCurrentUserUseCase } from "./GetCurretnUserUseCase";
import { left, right } from "../../../../shared/core/Result";

export class GetCurrentUserController extends BaseController<AuthenticatedRequest> {
  constructor(useCase: GetCurrentUserUseCase) {
    super();

    this.versionRegister.addToRegister("1.0.0", async (req: AuthenticatedRequest, res: Response) => {
      const response = await useCase.execute({ user: req.decoded });
      if (response.isLeft()) {
        return this.errorHandler(res, response.value);
      }

      return this.ok(res, response.value);
    });
  }
}
