import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { UpdateUserStatsUseCase } from "../../../../user/useCases/updateUserStats/updateUserStatsUseCase";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { DeactivateUnactiveAnimalsDTO } from "./deactivateUnactiveAnimalsDTO";
import { DeactivateAnimalsResponse } from "./deactivateUnactiveAnimalsResponse";

export class DeactivateUnactiveAnimalsUseCase implements UseCase<DeactivateUnactiveAnimalsDTO, DeactivateAnimalsResponse> {
  
  protected updateStats: UpdateUserStatsUseCase
  protected animalRepo: IAnimalRepo

  constructor (udpateStats: UpdateUserStatsUseCase, animalRepo: IAnimalRepo) {
    this.updateStats = udpateStats
    this.animalRepo = animalRepo
  }

  async execute(request: DeactivateUnactiveAnimalsDTO): Promise<DeactivateAnimalsResponse> {
    const result = await this.animalRepo.countUnactive(request.date, 1)
    if (result.isLeft()) {
      return left(result.value)
    }


    return right('ok')
  }
}