import { Request } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserInfoUseCase } from "./getUserInfoUseCase";

export class GetUserInfoController extends BaseController<Request> {
  constructor(getUserInfoUseCase: GetUserInfoUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const { id } = req.params;
      const response = await getUserInfoUseCase.execute({ id: id as string });
      if (response.isLeft()) {
        return this.errorHandler(res, response.value);
      }

      return this.ok(res, response.value);
    });
  }
}
