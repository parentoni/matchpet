import { Request } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetAnimaListingByIdUseCase } from "./GetAnimalListingByIdUseCase";
import { GetAnimalListingByIdDTO } from "./GetAnimalListingByIdDTO";

export class GetAnimalListingByIdController extends BaseController<Request> {
  constructor(useCase: GetAnimaListingByIdUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const dto = req.params as unknown as GetAnimalListingByIdDTO;

      const response = await useCase.execute({ id: dto.id });

      if (response.isLeft()) {
        return this.errorHandler(res, response.value);
      }

      return this.ok(res, response.value);
    });
  }
}
