import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IAnimalRepo } from "../../repository/IAnimalRepo";
import { GetAnimalListingByIdDTO } from "./GetAnimalListingByIdDTO";
import { GetAnimalListingByIdResponse } from "./GetAnimalListingByIdResponse";

export class GetAnimaListingByIdUseCase implements UseCase<GetAnimalListingByIdDTO, GetAnimalListingByIdResponse> {
  private animalRepo: IAnimalRepo;
  constructor(animalRepo: IAnimalRepo) {
    this.animalRepo = animalRepo;
  }

  async execute(request: GetAnimalListingByIdDTO): GetAnimalListingByIdResponse {
    const guardResult = Guard.againstNullOrUndefined(request.id, "ANIMAL_ID");
    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    const repoResponse = await this.animalRepo.findById(request.id);

    if (repoResponse.isLeft()) {
      return left(repoResponse.value);
    }

    return right(repoResponse.value);
  }
}
