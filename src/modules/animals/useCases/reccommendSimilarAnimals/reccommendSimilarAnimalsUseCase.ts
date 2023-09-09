import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { IAnimalPersistent } from "../../../../shared/infra/database/models/Animal";
import { AnimalMapper } from "../../mappers/AnimalMapper";
import { IAnimalRepo } from "../../repository/IAnimalRepo";
import { ReccommendSimilarAnimalsDTO } from "./reccommendSimilarAnimalsDTO";
import { ReccommendSimilarAnimalsUseCaseResponse } from "./reccommendSimilarAnimalsResponse";

export class ReccommendSimilarAnimalsUseCase implements UseCase<ReccommendSimilarAnimalsDTO, ReccommendSimilarAnimalsUseCaseResponse> {
  private animalRepo: IAnimalRepo;

  constructor(animalRepo: IAnimalRepo) {
    this.animalRepo = animalRepo;
  }

  async execute(request: ReccommendSimilarAnimalsDTO): Promise<ReccommendSimilarAnimalsUseCaseResponse> {
    const animalId = UniqueGlobalId.createExisting(request.id);

    if (animalId.isLeft()) {
      return left(animalId.value);
    }

    // Get requested animal
    const animal = await this.animalRepo.findById(animalId.value.toValue());

    if (animal.isLeft()) {
      return left(animal.value);
    }

    const optionIdArray: string[] = [];

    for (const trait of animal.value.animalTraits.list) {
      optionIdArray.push(trait.value);
    }
    const result = await this.animalRepo.findSimilar(animal.value.id.toValue(), animal.value.specieId.toValue(), optionIdArray);

    if (result.isLeft()) {
      return left(result.value);
    }

    const persistentArray: IAnimalPersistent[] = []
    
    for (const animal of result.value) {
      const mapperResult = AnimalMapper.toPersistent(animal)
      if (mapperResult.isLeft()) {
        return left(mapperResult.value)
      }

      persistentArray.push(mapperResult.value)
    }

    return right(persistentArray);
  }
}
