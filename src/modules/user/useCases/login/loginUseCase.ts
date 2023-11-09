import { Guard } from "../../../../shared/core/Guard";
import { right, left } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { TokenFunctions } from "../../domain/jwt";
import { UserEmail } from "../../domain/userProps/userEmail";
import { UserPassword } from "../../domain/userProps/userPassword";
import { IUserRepo } from "../../repository/IUserRepo";
import { authService } from "../../services";
import { IAuthService } from "../../services/IauthService";
import { LoginDTO } from "./loginDTO";
import { LoginResponse } from "./loginResponse";

export class LoginUseCase implements UseCase<LoginDTO, LoginResponse> {
  private userRepo: IUserRepo;
  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: LoginDTO): Promise<LoginResponse> {
    const givenEmailOrError = UserEmail.create({ value: request.email });
    const givenPasswordOrError = UserPassword.create({
      value: request.password,
      hashed: false
    });

    const result = EitherUtils.combine([givenEmailOrError, givenPasswordOrError]);

    if (result.isLeft()) {
      return left(result.value);
    }

    const givenEmail = givenEmailOrError.value as UserEmail;
    const givenPassword = givenPasswordOrError.value as UserPassword;
    const user = await this.userRepo.find_one({
      filter: { email: givenEmail.value }
    });

    if (user.isLeft()) {
      return left(user.value);
    } else {
      if (await user.value.password.comparePassword(givenPassword.value)) {
        const token = await authService.signJWT({
          email: user.value.email.value,
          uid: user.value.id.toValue(),
          display_namme: user.value.name.value,
          token_function: TokenFunctions.authenticateUser,
          role: user.value.role,
          verified: user.value.verified
        });
        return right(token);
      } else {
        return left(
          CommonUseCaseResult.Forbidden.create({
            location: `${LoginUseCase.name}.${this.execute.name}`,
            variable: "PASSWORD",
            errorMessage: "Invalid Credentials"
          })
        );
      }
    }
  }
}
