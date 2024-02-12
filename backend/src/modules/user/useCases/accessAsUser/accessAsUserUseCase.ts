import { UseCase } from "../../../../shared/core/UseCase";
import { IAuthService } from "../../services/IauthService";
import { AccessAsUserDTO } from "./accessAsUserDTO";
import { GetUserByUIDUseCase } from "../getUserByUID/getUserByUIDUseCase";
import { left, right } from "../../../../shared/core/Result";
import { AccessAsUserResponse } from "./accessAsUserResponse";
import { TokenFunctions } from "../../domain/jwt";
/**
 * 
 * @class AccessAsUserUseCase
 * @classdesc Admin access to user accounts. Generate auth token as response
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class AccessAsUserUseCase implements UseCase<AccessAsUserDTO, AccessAsUserResponse> {
  getUserByUIDUseCase: GetUserByUIDUseCase;
  authService: IAuthService;

  constructor(getUserByUIDUseCase: GetUserByUIDUseCase, authService: IAuthService) {
    this.getUserByUIDUseCase = getUserByUIDUseCase
    this.authService = authService
  }

  async execute(request: AccessAsUserDTO ): Promise<AccessAsUserResponse> {
    //Get user by uid
    const userResponse = await this.getUserByUIDUseCase.execute({uid: request.uid})

    //User doesn't exist
    if (userResponse.isLeft()) {
      return left(userResponse.value)
    }

    const user = userResponse.value
    //Create token
    const authRespone = await this.authService.signJWT({
        uid: user._id,
        email: user.email,
        display_name: user.display_name,
        role: user.role,
        token_function: TokenFunctions.authenticateUser,
        verified: user.verified,
        username: user.username,
    })

    //return token
    return right({token: authRespone})
  }
}
