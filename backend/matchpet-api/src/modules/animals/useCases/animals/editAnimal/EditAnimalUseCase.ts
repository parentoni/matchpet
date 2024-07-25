import { Guard } from "../../../../../shared/core/Guard";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { IAnimalPersistent } from "../../../../../shared/infra/database/models/Animal";
import { UpdateUserStatsUseCase } from "../../../../user/useCases/updateUserStats/updateUserStatsUseCase";
import { AnimalMapper } from "../../../mappers/AnimalMapper";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { ISpecieRepo } from "../../../repository/ISpeciesRepo";
import { EditAnimalDTO } from "./EditAnimalDTO";
import { EditAnimalErrors } from "./EditAnimalErrors";
import { EditAnimalResponse } from "./EditAnimalResponses";

export class EditAnimalUseCase implements UseCase<EditAnimalDTO, EditAnimalResponse> {
  animalRepo: IAnimalRepo;
  speciesRepo: ISpecieRepo;
  updateStats: UpdateUserStatsUseCase;

  constructor(animalRepo: IAnimalRepo, speciesRepo: ISpecieRepo, updateStats: UpdateUserStatsUseCase) {
    this.animalRepo = animalRepo;
    this.speciesRepo = speciesRepo;
    this.updateStats = updateStats;
  }

  async execute(request: EditAnimalDTO): Promise<EditAnimalResponse> {
    const guardResponse = Guard.againstNullOrUndefinedBulk([
      { argumentName: "user", argument: request.user },
      { argumentName: "animal_id", argument: request.animal },
      { argumentName: "edit", argument: request.edit }
    ]);

    if (guardResponse.isLeft()) {
      return left(guardResponse.value);
    }

    const animal = await this.animalRepo.findById(request.animal);
    if (animal.isLeft()) {
      return left(animal.value);
    }

    if (animal.value.donatorId.toValue() !== request.user.uid) {
      return left(EditAnimalErrors.unathorized);
    }

    const persistenAtualAnimal = AnimalMapper.toPersistent(animal.value);

    if (persistenAtualAnimal.isLeft()) {
      return left(persistenAtualAnimal.value);
    }

    if (request.edit?.image) {
      request.edit.image = request.edit?.image;
    }

    const persistentNewAnimal: IAnimalPersistent = {
      _id: persistenAtualAnimal.value._id,
      status: persistenAtualAnimal.value.status,
      created_at: persistenAtualAnimal.value.created_at,
      donator_id: persistenAtualAnimal.value.donator_id,
      specie_id: persistenAtualAnimal.value.specie_id,
      last_modified_at: persistenAtualAnimal.value.last_modified_at,
      contact: persistenAtualAnimal.value.contact,
      views: persistenAtualAnimal.value.views,
      clicks: persistenAtualAnimal.value.clicks,
      ibgeId: persistenAtualAnimal.value.ibgeId,
      name: request.edit.name || persistenAtualAnimal.value.name,
      image: request.edit.image || persistenAtualAnimal.value.image,
      imageExport: persistenAtualAnimal.value.imageExport,
      description: request.edit.description || persistenAtualAnimal.value.description,
      traits: request.edit.traits || persistenAtualAnimal.value.traits,
      sex: request.edit.sex || persistenAtualAnimal.value.sex
    };

    const domainNewAnimal = AnimalMapper.toDomain(persistentNewAnimal);

    if (domainNewAnimal.isLeft()) {
      return left(EditAnimalErrors.dbError);
    }

    const specie = await this.speciesRepo.findById(domainNewAnimal.value.specieId.toValue());

    if (specie.isLeft()) {
      return left(specie.value);
    }

    if (request.edit.status && request.edit.status !== animal.value.animalStatus.value) {
      const updateUserResponse = domainNewAnimal.value.animalChangeStatus(request.edit.status);
      if (updateUserResponse.isLeft()) {
        return left(updateUserResponse.value);
      }

      persistentNewAnimal.status = request.edit.status;
    }

    const isTraitValid = specie.value.validateArrayOfAnimalTraits(domainNewAnimal.value.animalTraits);
    if (isTraitValid.isLeft()) {
      return left(EditAnimalErrors.dbError);
    }

    domainNewAnimal.value.markAnimalAsEditied();
    const saveResult = await this.animalRepo.save(domainNewAnimal.value);
    if (saveResult.isLeft()) {
      return left(EditAnimalErrors.dbError);
    }

    return right(persistentNewAnimal);
  }
}
