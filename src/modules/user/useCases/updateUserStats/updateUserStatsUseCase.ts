import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IUserRepo } from "../../repository/IUserRepo";
import { UpdateUserStatsDTO } from "./updateUserStatsDTO";
import { UpdateUserStatsResponse } from "./updateUserStatsResponse";

export class UpdateUserStatsUseCase implements UseCase<UpdateUserStatsDTO, UpdateUserStatsResponse> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: UpdateUserStatsDTO): Promise<UpdateUserStatsResponse> {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      { argument: request.userId, argumentName: "USER_ID" },
      { argument: request.addInAdoption, argumentName: "IN_ADOTION_UPDATE" },
      { argument: request.addCompletedAdoptions, argumentName: "COMPLETED_ADOPTIONS_UPDATE" }
    ]);

    if (guardResponse.isLeft()) {
      return left(guardResponse.value);
    }

    const repoResponse = await this.userRepo.find_one({ filter: { _id: request.userId } });
    if (repoResponse.isLeft()) {
      return left(repoResponse.value);
    }

    const user = repoResponse.value;

    user.updateInAdoption(user.inAdoption + request.addInAdoption);
    user.updateCompletedAdoptions(user.completedAdoptions + request.addCompletedAdoptions);

    const saveResponse = await this.userRepo.create({ dto: user });
    if (saveResponse.isLeft()) {
      return left(saveResponse.value);
    }

    return right(user);
  }
}
