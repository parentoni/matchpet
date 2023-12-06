import { Request } from "express";
import { AuthenticatedRequest } from "../../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetAllSpeciesUseCase } from "./getAllSpeciesUseCase";

export class GetAllSpeciesController extends BaseController<Request> {
  constructor(useCase: GetAllSpeciesUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const response = await useCase.execute(null);

      if (response.isLeft()) {
        return this.errorHandler(res, response.value);
      }

      this.ok(res, response.value);
    });
  }
}
