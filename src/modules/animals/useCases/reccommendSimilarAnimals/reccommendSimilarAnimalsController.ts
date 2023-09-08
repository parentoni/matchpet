import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ReccommendSimilarAnimalsUseCase } from "./reccommendSimilarAnimalsUseCase";
import { ReccommendSimilarAnimalsDTO } from "./reccommendSimilarAnimalsDTO";

export class ReccommendSimilarAnimalsController extends BaseController<Request> {
  constructor(reccommendSimilarAnimalsUseCase: ReccommendSimilarAnimalsUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req: Request, res: Response) => {
      const dto = req.params as unknown as ReccommendSimilarAnimalsDTO;
      const useCaseResponse = await reccommendSimilarAnimalsUseCase.execute(dto);

      if (useCaseResponse.isLeft()) {
        return this.errorHandler(res, useCaseResponse.value);
      }

      return this.ok(res, useCaseResponse.value);
    });
  }
}
