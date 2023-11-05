import { Guard } from "../../../../../shared/core/Guard";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { UniqueGlobalId } from "../../../../../shared/domain/UniqueGlobalD";
import { IAnimalPersistent } from "../../../../../shared/infra/database/models/Animal";
import { updateUserStatsUseCase } from "../../../../user/useCases/updateUserStats";
import { UpdateUserStatsUseCase } from "../../../../user/useCases/updateUserStats/updateUserStatsUseCase";
import { ANIMAL_STATUS } from "../../../domain/animal/AnimalStatus";
import { AnimalMapper } from "../../../mappers/AnimalMapper";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { ISpecieRepo } from "../../../repository/ISpeciesRepo";
import { EditAnimalDTO } from "./EditAnimalDTO";
import { EditAnimalErrors } from "./EditAnimalErrors";
import { EditAnimalResponse } from "./EditAnimalResponses";

export class EditAnimalUseCase implements UseCase<EditAnimalDTO, EditAnimalResponse> {
  
  animalRepo: IAnimalRepo;
  speciesRepo: ISpecieRepo;
  updateStats: UpdateUserStatsUseCase

  constructor(animalRepo:IAnimalRepo, speciesRepo: ISpecieRepo, updateStats: UpdateUserStatsUseCase) {
    this.animalRepo = animalRepo
    this.speciesRepo = speciesRepo
    this.updateStats = updateStats
  }
  
  async execute(request: EditAnimalDTO ): Promise<EditAnimalResponse> {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      {argumentName: "user", argument: request.user},
      {argumentName: "animal_id", argument: request.animal},
      {argumentName: "edit", argument: request.edit}
    ])

    if (guardResponse.isLeft()) {
      return left(guardResponse.value)
    }

    const animal = await this.animalRepo.findById(request.animal)
    if (animal.isLeft()) {
      return left(animal.value)
    }

    if (animal.value.donatorId.toValue() !== request.user.uid) {
      return left(EditAnimalErrors.unathorized)
    }

    const persistenAtualAnimal = AnimalMapper.toPersistent(animal.value)

    if (persistenAtualAnimal.isLeft()) {
      return left(persistenAtualAnimal.value)
    }

    if (request.edit?.image) {
      request.edit.image = request.edit?.image
    }

    const persistentNewAnimal = {...persistenAtualAnimal.value, ...request.edit} as IAnimalPersistent
    const domainNewAnimal = AnimalMapper.toDomain(persistentNewAnimal)

    if (domainNewAnimal.isLeft()) {
      return left(EditAnimalErrors.dbError)
    }

    const specie = await this.speciesRepo.findById(domainNewAnimal.value.specieId.toValue())
    
    if (specie.isLeft()) {
      return left(specie.value)
    }

    const isTraitValid = specie.value.validateArrayOfAnimalTraits(domainNewAnimal.value.animalTraits);
    if (isTraitValid.isLeft()) {
      return left(EditAnimalErrors.dbError)
    }

    const saveResult = await this.animalRepo.save(domainNewAnimal.value)

    if (saveResult.isLeft()) {
      return left(EditAnimalErrors.dbError)
    }

    if (request.edit.status && request.edit.status !== animal.value.animalStatus.value) {
      const updateUserResponse = await this.updateStats.execute({
        userId: request.user.uid,
        addInAdoption: request.edit.status === 'PENDING'? 1 :animal.value.animalStatus.value === ANIMAL_STATUS.PENDING? -1:0,
        addCompletedAdoptions: request.edit.status === 'DONATED'?1:animal.value.animalStatus.value === ANIMAL_STATUS.DONATED? -1:0
      })

      if (updateUserResponse.isLeft()) {
        return left(updateUserResponse.value)
      }
    }

    return right(persistentNewAnimal)

  }

}