import { urlencoded } from "body-parser";
import { Secrets } from "../../../../config/secretsManager";
import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TokenFunctions } from "../../domain/jwt";
import { IAuthService } from "../../services/IauthService";
import { CreateUserVerificationTokenDTO } from "./createUserVerificationTokenDTO";
import { CreateUserVerificationTokenResponse } from "./createUserVerificationTokenResponse";

export class CreateUserVerificationTokenUseCase implements UseCase<CreateUserVerificationTokenDTO, CreateUserVerificationTokenResponse> {
  private authServive: IAuthService;

  constructor (authService: IAuthService) {
    this.authServive = authService
  }

  async execute(request: CreateUserVerificationTokenDTO): Promise<CreateUserVerificationTokenResponse> {
    const response = Guard.againstNullOrUndefined(request.user, 'USER')
    if (response.isLeft()) {
      return left(response.value)
    }

    const token = await this.authServive.signJWT({
      uid: request.user.id.toValue(),
      username: request.user.userName.value,
      email: request.user.email.value,
      verified: request.user.verified,
      display_name: request.user.displayName.value,
      role: request.user.role,
      token_function: TokenFunctions.verifyUser
    }, '10m')

    return right({
      token: token,
      url: Secrets.getSecret('PUBLIC_APP_URL') + `auth/register/verify?token=${token}`
    })
  }
}