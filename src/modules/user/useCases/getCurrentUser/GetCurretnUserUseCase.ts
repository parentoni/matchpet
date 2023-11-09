import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserMap } from "../../mappers/userMap";
import { GetUserByUIDUseCase } from "../getUserByUID/getUserByUIDUseCase";
import { GetCurrentUserDTO } from "./GetCurrentUserDTO";
import { GetCurrentUserResponse } from "./GetCurretnUserResponse";

export class GetCurrentUserUseCase implements UseCase<GetCurrentUserDTO, GetCurrentUserResponse> {
  private getUserByUID: GetUserByUIDUseCase

  constructor(getUserByUID: GetUserByUIDUseCase) {
    this.getUserByUID = getUserByUID
  }
  
  async execute(request: GetCurrentUserDTO): Promise<GetCurrentUserResponse> {
    const check = Guard.againstNullOrUndefined(request.user, "USER")
    if (check.isLeft()) {
      return left(check.value)
    }

    const useCaseResponse = await this.getUserByUID.execute({uid: request.user.uid})
    if (useCaseResponse.isLeft()) {
      return left(useCaseResponse.value)
    }

    const userDomain = await UserMap.toDomain(useCaseResponse.value)
    if (userDomain.isLeft()) {
      return left(userDomain.value)
    }

    userDomain.value.logActivity()
    return right(useCaseResponse.value)
  }
}