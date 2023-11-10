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
import { IUserPersistant } from "../../../../shared/infra/database/models/User";
import { UserName } from "../../domain/userProps/userName";

export class LoginUseCase implements UseCase<LoginDTO, LoginResponse> {
  private userRepo: IUserRepo;
  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: LoginDTO): Promise<LoginResponse> {


    let filter: Partial<IUserPersistant>;

    if (request.credential.includes('@')) {
      const givenEmailOrError = UserEmail.create({ value: request.credential });
      if (givenEmailOrError.isLeft()) {
        return left(givenEmailOrError.value)
      }

      filter = {email: givenEmailOrError.getRight().value}
    } else {
      const givenUserNameOrError = UserName.create({ username: request.credential });
      if (givenUserNameOrError.isLeft()) {
        return left(givenUserNameOrError.value)
      }

      filter = {username: givenUserNameOrError.getRight().value}
    }

    const givenPasswordOrError = UserPassword.create({
          value: request.password,
          hashed: false
        });

    if (givenPasswordOrError.isLeft()) {
      return left(givenPasswordOrError.value);
    }

    const givenPassword = givenPasswordOrError.value as UserPassword;
    const user = await this.userRepo.find_one({
      filter: filter
    });

    if (user.isLeft()) {
      return left(user.value);
    } else {
      if (await user.value.password.comparePassword(givenPassword.value)) {
        const token = await authService.signJWT({
          email: user.value.email.value,
          uid: user.value.id.toValue(),
          display_namme: user.value.displayName.value,
          token_function: TokenFunctions.authenticateUser,
          role: user.value.role,
          verified: user.value.verified,
          username: user.value.userName.value
        });

        user.value.logActivity();

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
