import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { FilterAnimalsUseCase } from "./filterAnimalsUseCase";
import { FilterAnimalsDTO, FilterObject } from "./filterAnimalsDTO";
import { AnimalRepo } from "../../../repository/implementations/animalRepo";
import { animalRepo } from "../../../repository";
import { Location } from "../../../../../shared/core/Location";

export class FilterAnimaslsController extends BaseController<Request> {
  constructor(filterAnimalsUseCase: FilterAnimalsUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req: Request, res: Response) => {
      const dto = req.body as FilterAnimalsDTO;
      const useCaseResponse = await filterAnimalsUseCase.execute(dto);

      if (useCaseResponse.isLeft()) {
        return this.errorHandler(res, useCaseResponse.value);
      }

      return this.ok(res, useCaseResponse.value);
    });

    
  }
}
