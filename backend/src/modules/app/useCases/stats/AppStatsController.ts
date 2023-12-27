import { left } from "../../../../shared/core/Result";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AppStatsUseCase } from "./AppStatsUseCase";
import { Request } from "express";

export class AppStatsController extends BaseController<Request> {
  constructor(useCase: AppStatsUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const useCaseResponse = await useCase.execute();
      if (useCaseResponse.isLeft()) {
        return this.errorHandler(res, useCaseResponse.value);
      }

      return this.ok(res, useCaseResponse.value);
    });
  }
}
