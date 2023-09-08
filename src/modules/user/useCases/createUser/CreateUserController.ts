import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { authService } from "../../services";
import { TokenFunctions } from "../../domain/jwt";
// import { AuthService } from "../../services/implementations/authService";
import { IAuthService } from "../../services/IauthService";
import { User } from "../../domain/user";

export class CreateUserController extends BaseController<Request> {
  constructor(CreateUserUseCase: CreateUserUseCase, authService: IAuthService) {
    super();
    this.versionRegister.default = "1.0.0";

    this.versionRegister.addToRegister("1.0.0", async (req: Request, res: Response) => {
      const dto = req.body as CreateUserDTO;

      try {
        const result = await CreateUserUseCase.execute({
          first_name: dto.first_name,
          last_name: dto.last_name,
          password: dto.password,
          email: dto.email,
          phone: dto.phone,
          role: dto.role
        });

        if (result.isLeft()) {
          const error = result.value;
          return this.errorHandler(res, error);
        }

        //Generate token for instant user access
        const token = await authService.signJWT({
          uid: result.value.id.toValue(),
          email: dto.email,
          first_name: dto.first_name,
          last_name: dto.last_name,
          token_function: TokenFunctions.authenticateUser,
          role: result.value.role,
          verified: result.value.verified
        });
        this.ok(res, { token: token });
      } catch (err) {
        this.fail(res, err as Error);
      }
    });
  }
}
