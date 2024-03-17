import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TokenFunctions } from "../../domain/jwt";
import { UserPassword } from "../../domain/userProps/userPassword";
import { IUserRepo } from "../../repository/IUserRepo";
import { IAuthService } from "../../services/IauthService";
import { ChangePasswordDTO } from "./changePasswordDTO";
import { ChangePasswordResponse } from "./changePasswordResponse";

export class ChangePasswordUseCase implements UseCase<ChangePasswordDTO, ChangePasswordResponse> {
  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(authService: IAuthService, userRepo: IUserRepo) {
    this.authService = authService;
    this.userRepo = userRepo;
  }

  async execute(request: ChangePasswordDTO): Promise<ChangePasswordResponse> {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      { argument: request.password, argumentName: "USER_PASSWORD" },
      { argument: request.token, argumentName: "TOKEN" }
    ]);

    if (guardResponse.isLeft()) {
      return left(guardResponse.value);
    }

    const decodeResponse = await this.authService.decodeJWT(request.token);

    if (decodeResponse.isLeft()) {
      return left(decodeResponse.value);
    }

    const userInfo = decodeResponse.value;

    if (userInfo.token_function !== TokenFunctions.changePassword) {
      return left(
        CommonUseCaseResult.Forbidden.create({
          errorMessage: `Invalid token function, expected ${TokenFunctions.changePassword} received: ${userInfo.token_function}.`,
          location: `${ChangePasswordUseCase.name}.${this.execute.name}`,
          variable: "TOKEN_FUNCTION"
        })
      );
    }

    const user = await this.userRepo.find_one({ filter: { _id: userInfo.uid } });

    if (user.isLeft()) {
      return left(user.value);
    }

    const newUserPassword = UserPassword.create({
      value: request.password,
      hashed: false
    });

    if (newUserPassword.isLeft()) {
      return left(newUserPassword.value);
    }

    user.value.props.password = newUserPassword.value;

    const saveResult = await this.userRepo.create({ dto: user.value });
    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    return right("ok");
  }
}
