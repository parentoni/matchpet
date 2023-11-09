import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserLastLogin } from "../../domain/userProps/userLastLogin";
import { IUserRepo } from "../../repository/IUserRepo";
import { LogUserActivityDTO } from "./logUserActivityDTO";
import { LogUserActivityResponse } from "./logUserActivityResponse";

export class LogUserActivityUseCase implements UseCase<LogUserActivityDTO, LogUserActivityResponse> {

  protected userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }

  async execute(request: LogUserActivityDTO ): Promise<LogUserActivityResponse> {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      {argument: request.uid, argumentName: "USER_ID"},
      {argument: request.date, argumentName: "USER_LAST_ACTIVITY_DATE"}
    ])

    if (guardResponse.isLeft()) {
      return left(guardResponse.value)
    }

    const repoResponse = await this.userRepo.find_one({filter: {_id: request.uid}})
    if (repoResponse.isLeft()) {
      return left(repoResponse.value)
    }

    const userLoginDate = UserLastLogin.create({date: request.date})
    if (userLoginDate.isLeft()) {
      return left(userLoginDate.value)
    }

    repoResponse.value.props.lastLogin = userLoginDate.value
    const saveResponse = await this.userRepo.create({dto: repoResponse.value})
    if (saveResponse.isLeft()) {
      return left(saveResponse.value)
    }

    return right(request.date)
  }
}