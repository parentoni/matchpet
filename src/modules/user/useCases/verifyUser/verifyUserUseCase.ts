import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TokenFunctions } from "../../domain/jwt";
import { IUserRepo } from "../../repository/IUserRepo";
import { IAuthService } from "../../services/IauthService";
import { VerifyUserDTO } from "./verifyUserDTO";
import { VerifyUserResponse } from "./verifyUserResponse";

export class VerifyUserUseCase implements UseCase<VerifyUserDTO, VerifyUserResponse> {
  private authService: IAuthService;
  private userRepo: IUserRepo
  
  constructor (authService: IAuthService, userRepo: IUserRepo) {
    this.authService = authService
    this.userRepo = userRepo
  }
  
  async execute(request: VerifyUserDTO ): Promise<VerifyUserResponse> {
    const response = Guard.againstNullOrUndefined(request.token, "TOKEN")
    if (response.isLeft()) {
      return left(response.value)
    }

    const responseJWT = await this.authService.decodeJWT(request.token)

    if (responseJWT.isLeft()) {
      return left(responseJWT.value)
    }

    const userInfo = responseJWT.value

    if (userInfo.token_function !== TokenFunctions.verifyUser) {
      return left(CommonUseCaseResult.Forbidden.create({
        errorMessage: `Invalid token function, expected ${TokenFunctions.verifyUser} received: ${userInfo.token_function}.`,
        location: `${VerifyUserUseCase.name}.${this.execute.name}`,
        variable: "TOKEN_FUNCTION"
      }))
    }

    const repoResponse = await this.userRepo.find_one({filter: {_id: userInfo.uid}})
    
    if (repoResponse.isLeft()) {
      return left(repoResponse.value)
    }

    if (repoResponse.value.verified ) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: `User ${repoResponse.value.email.mask()} is already verified.`,
        location: `${VerifyUserUseCase.name}.${this.execute.name}`,
        variable: "USER_VERIFIED"
      }))
    } 

    repoResponse.value.props.verified = true

    const saveResponse = await this.userRepo.create({dto: repoResponse.value})

    if (saveResponse.isLeft()) {
      return left(saveResponse.value)
    }


    const accessToken = await this.authService.signJWT({
      uid: repoResponse.value.id.toValue(),
      username: repoResponse.value.userName.value,
      role: repoResponse.value.role,
      email: repoResponse.value.email.value,
      display_name: repoResponse.value.displayName.value,
      token_function: TokenFunctions.authenticateUser,
      verified: true
    })

    return right({
      token: accessToken
    })
  }
}