import { AuthenticatedRequest } from "../../../../shared/infra/http/models/AutheticatedRequest";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserDTO } from "../createUser/CreateUserDTO";
import { EditUserUseCase } from "./EditUserUseCase";

export class EditUserController extends BaseController<AuthenticatedRequest> {
  constructor(editUserUseCase: EditUserUseCase) {
    super();
    this.versionRegister.addToRegister("1.0.0", async (req, res) => {
      const edit = req.body as CreateUserDTO;
      const response = await editUserUseCase.execute({
        edit: edit,
        jwt: req.decoded
      });

      if (response.isLeft()) {
        return this.errorHandler(res, response.value);
      }

      return this.ok(res, response.value);
    });
  }
}
