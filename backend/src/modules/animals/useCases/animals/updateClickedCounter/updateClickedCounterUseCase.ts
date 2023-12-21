import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { UpdateClickedCounterDTO } from "./updateClickedCounterDTO";
import { UpdateClickedCounterResponse } from "./updateClickedCounterResponse";

export class UpdateClickedCounterUseCase implements UseCase<UpdateClickedCounterDTO, UpdateClickedCounterResponse> {
  animalRepo: IAnimalRepo;
  
  constructor(animalRepo: IAnimalRepo) {
    this.animalRepo = animalRepo
  }
  
  
  async execute(request: UpdateClickedCounterDTO ): Promise<UpdateClickedCounterResponse> {
    request.animal.incrementAnimalClickCount(1)
    const response = await this.animalRepo.save(request.animal)
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(null)
  }
}