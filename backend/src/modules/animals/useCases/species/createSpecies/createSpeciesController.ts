import { Response } from "express";
import { AuthenticatedRequest } from "../../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CreateSpecieUseCase } from "./createSpeciesUseCase";
import { CreateSpeciesDto } from "./createSpeciesDTO";

export class CreateSpeciesController extends BaseController<AuthenticatedRequest> {
  constructor(useCase: CreateSpecieUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req: AuthenticatedRequest, res: Response) => {
      const dto = req.body as CreateSpeciesDto;
      const speciesOrError = await useCase.execute(dto);
      if (speciesOrError.isLeft()) {
        this.errorHandler(res, speciesOrError.value);
      } else {
        this.ok(res, speciesOrError.value);
      }
    });
  }
}
