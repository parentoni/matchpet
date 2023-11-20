import { Secrets } from "../../../../config/secretsManager";
import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TokenFunctions } from "../../domain/jwt";
import { IAuthService } from "../../services/IauthService";
import { CreateNewPasswordTokenDTO } from "./createNewPasswordTokenDTO";
import { CreateNewPasswordTokenResponse } from "./createNewPasswordTokenResponse";

export class CreateNewPasswordTokenUseCase implements UseCase<CreateNewPasswordTokenDTO, CreateNewPasswordTokenResponse> {
  private authService: IAuthService;
  
  constructor(authService: IAuthService) {
    this.authService = authService
  }
  
  async execute(request: CreateNewPasswordTokenDTO ): Promise<CreateNewPasswordTokenResponse> {
    const guardResponse = Guard.againstNullOrUndefined(request.user, 'USER')
    if (guardResponse.isLeft()) {
      return left(guardResponse.value)
    }

    const token = await this.authService.signJWT({
      uid: request.user.id.toValue(),
      email: request.user.email.value,
      display_name: request.user.displayName.value,
      role: request.user.role,
      token_function: TokenFunctions.changePassword,
      verified: request.user.verified,
      username: request.user.userName.value
    }, '10m')

    return right({
      token: token,
      url: Secrets.getSecret('PUBLIC_APP_URL') + `/new-password?token=${token}`
    })
  }
}