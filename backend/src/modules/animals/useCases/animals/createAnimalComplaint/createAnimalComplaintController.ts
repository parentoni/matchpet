import { Request } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CreateAnimalComplaintUseCase } from "./createAnimalComplaintUseCase";
import { CreateAnimalComplaintDTO } from "./createAnimalComplaintDTO";

export class CreateAnimalComplaintController extends BaseController<Request> {
  constructor(useCase: CreateAnimalComplaintUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const body = req.body as CreateAnimalComplaintDTO;
      const { id } = req.params;
      const response = await useCase.execute({
        ...body,
        animal_id: id || ''
      });

      if (response.isLeft()) {
        return this.errorHandler(res, response.value);
      }

      return this.ok(res, { message: response.value });
    });
  }
}
