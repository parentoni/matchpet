import { Request } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { LoginUseCase } from "./loginUseCase";
import { Response } from "express-serve-static-core";
import { LoginDTO } from "./loginDTO";

export class LoginController extends BaseController<Request> {
  constructor(useCase: LoginUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req: Request, res: Response) => {
      const loginDto = req.body as LoginDTO;
      const result = await useCase.execute(loginDto);

      if (result.isLeft()) {
        return this.errorHandler(res, result.value);
      } else {
        return this.ok(res, {
          token: result.value
        });
      }
    });
  }
}
