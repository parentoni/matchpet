//todo: revisit this on active update

import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IUserRepo } from "../../../user/repository/IUserRepo";
import { AppStatsResponse } from "./AppStatsResponse";

export class AppStatsUseCase implements UseCase<void, AppStatsResponse> {
  userRepo: IUserRepo;
  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }
  async execute(): Promise<AppStatsResponse> {
    const response = await this.userRepo.aggregateStats() 
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(response.value)
  }
}