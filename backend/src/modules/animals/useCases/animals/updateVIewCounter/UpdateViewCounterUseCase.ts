import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { UpdateViewCounterDTO } from "./UpdateViewCounterDTO";
import { UpdateViewCounterResponse } from "./updateViewCounterResponse";

export class UpdateViewCounterUseCase implements UseCase<UpdateViewCounterDTO, UpdateViewCounterResponse> {
  animalRepo: IAnimalRepo;

  constructor(animalRepo: IAnimalRepo) {
    this.animalRepo = animalRepo;
  }

  async execute(request: UpdateViewCounterDTO): Promise<UpdateViewCounterResponse> {
    const idArr: string[] = [];
    if (request.animals.length > 0) {
      for (const animal of request.animals) {
        idArr.push(animal.id.toValue());
      }
      const response = await this.animalRepo.updateViewsForAnimalBatch(idArr);

      if (response.isLeft()) {
        return left(response.value);
      }
    }

    return right(null);
  }
}
