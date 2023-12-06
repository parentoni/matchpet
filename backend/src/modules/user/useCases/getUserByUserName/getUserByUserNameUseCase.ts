import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserMap } from "../../mappers/userMap";
import { IUserRepo } from "../../repository/IUserRepo";
import { GetUserByUserNameDTO } from "./getUserByUserNameDTO";
import { GetUserByUserNameResponse } from "./getUserByUserNameResponse";

export class GetUserByUserNameUseCase implements UseCase<GetUserByUserNameDTO, GetUserByUserNameResponse> {
  
  protected userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }

  async execute(request: GetUserByUserNameDTO ): Promise<GetUserByUserNameResponse> {
    const guardResult = Guard.againstNullOrUndefined(request.username, "USER_USERNAME")
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    const repoResult = await this.userRepo.find_one({filter: {username: request.username}})
    if (repoResult.isLeft()) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: `Username ${request.username} not found.`,
        location: `${GetUserByUserNameUseCase.name}.${this.execute.name}`,
        variable: `USER_USERNAME`
      }))
    }

    const mapperResult = await UserMap.toSafePersistent(repoResult.value)
    if (mapperResult.isLeft()) {
      return left(mapperResult.value)
    }

    return right(mapperResult.value)
  }
}