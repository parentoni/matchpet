import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IAnimalRepo } from "../../../animals/repository/IAnimalRepo";
import { GetUserAnimalsStatsDTO } from "./getUserAnimalStatsDTO";
import { GetUserAnimalsStatsResponse } from "./getUserAnimalsStatsResponse";

export class GetUserAnimalsStatsUseCase implements UseCase<GetUserAnimalsStatsDTO, GetUserAnimalsStatsResponse> {
  private animalRepo: IAnimalRepo;

  constructor(animalRepo: IAnimalRepo) {
    this.animalRepo = animalRepo;
  }

  async execute(request: GetUserAnimalsStatsDTO): Promise<GetUserAnimalsStatsResponse> {
    const result = await this.animalRepo.aggregateAnimalsViewsAndClicks(request.user.uid);
    if (result.isLeft()) {
      return left(result.value);
    }

    return right(result.value);
  }
}
