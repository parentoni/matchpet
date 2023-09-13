import { Request } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { FindSpecieByIdUseCase } from "./findSpecieByIdUseCase";
import { FindSpecieByIdDTO } from "./findSpecieByIdDTO";
import { Guard } from "../../../../../shared/core/Guard";

export class FindSpecieByIdController extends BaseController<Request> {
  constructor(findSpecieByIdUseCase: FindSpecieByIdUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const dto = req.params as unknown as FindSpecieByIdDTO;

      const guardResult = Guard.againstNullOrUndefined(dto.id, "ID");
      if (guardResult.isLeft()) {
        return this.errorHandler(res, guardResult.value);
      }

      const result = await findSpecieByIdUseCase.execute(dto);
      if (result.isLeft()) {
        return this.errorHandler(res, result.value);
      }

      return this.ok(res, result.value);
    });
  }
}
