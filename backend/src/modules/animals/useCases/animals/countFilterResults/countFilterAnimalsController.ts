import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CountFilterAnimalsUseCase } from "./countFilterAnimalsUseCase";
import { FilterAnimalsDTO } from "../filterAnimals/filterAnimalsDTO";

export class CountFilterAnimaslsController extends BaseController<Request> {
  constructor(countfilterAnimalsUseCase: CountFilterAnimalsUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req: Request, res: Response) => {
      const dto = req.body as FilterAnimalsDTO;
      const useCaseResponse = await countfilterAnimalsUseCase.execute(dto);

      if (useCaseResponse.isLeft()) {
        return this.errorHandler(res, useCaseResponse.value);
      }

      return this.ok(res, useCaseResponse.value);
    });
  }
}
