import { Request } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetAllActiveOrganizationsUseCase } from "./getAllActiveOrganizationsUseCase";
import { left } from "../../../../shared/core/Result";

export class GetAllActiveOrganizationsController extends BaseController<Request> {
  private useCase: GetAllActiveOrganizationsUseCase;

  constructor(useCase: GetAllActiveOrganizationsUseCase) {
    super();
    this.useCase = useCase;
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const useCaseResponse = await useCase.execute();

      if (useCaseResponse.isLeft()) {
        return this.errorHandler(res, useCaseResponse.value);
      }

      return this.ok(res, useCaseResponse.value);
    });
  }
}
