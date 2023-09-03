import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { Timestamp } from "../../../../shared/core/Timestamp";
import { UseCase } from "../../../../shared/core/UseCase";
import { ValidUrl } from "../../../../shared/core/ValidUrl";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { UserId } from "../../../user/domain/userProps/userId";
import { Animal } from "../../domain/Animal";
import { AnimalAge } from "../../domain/animal/AnimalAge";
import { AnimalName } from "../../domain/animal/AnimalName";
import { ANIMAL_STATUS, AnimalStatus } from "../../domain/animal/AnimalStatus";
import { AnimalTrait } from "../../domain/animal/AnimalTraits";
import { IAnimalRepo } from "../../repository/IAnimalRepo";
import { ISpecieRepo } from "../../repository/ISpeciesRepo";
import { CreateAnimalListingDTO } from "./createAnimalListingDTO";
import { CreateAnimalListingResponse } from "./createAnimalListingResponse";

export class CreateAnimalListingUseCase implements UseCase<CreateAnimalListingDTO, CreateAnimalListingResponse> {
  private specieRepo: ISpecieRepo;
  private animalRepo: IAnimalRepo;

  constructor(specieRepo: ISpecieRepo, animalRepo: IAnimalRepo) {
    this.specieRepo = specieRepo;
    this.animalRepo = animalRepo;
  }

  async execute(request: CreateAnimalListingDTO): Promise<CreateAnimalListingResponse> {
    const animalNameOrError = AnimalName.create({ value: request.name });
    const animalAgeOrError = AnimalAge.create({ months: request.age });
    const animalImageOrError = ValidUrl.create({ value: request.image_url });
    const animalSpecieTraitsOrError = AnimalTrait.create_bulk(request.traits);
    const animalCreatedTimespamp = Timestamp.create();
    const animalDonatorIdOError = UniqueGlobalId.createExisting(request.donatorId);
    const animalSpecieIdOrError = UniqueGlobalId.createExisting(request.specie_id);
    const animalStatusOrError = AnimalStatus.create(ANIMAL_STATUS.PENDING);

    const combineResult = EitherUtils.combine([
      animalNameOrError,
      animalAgeOrError,
      animalImageOrError,
      animalSpecieIdOrError,
      animalDonatorIdOError,
      animalSpecieTraitsOrError,
      animalStatusOrError
    ]);

    if (combineResult.isLeft()) {
      return left(combineResult.value);
    }

    const animalName = animalNameOrError.getRight();
    const animalAge = animalAgeOrError.getRight();
    const animalImage = animalImageOrError.getRight();
    const animalSpecieId = animalSpecieIdOrError.getRight();
    const animalDonatorId = animalDonatorIdOError.getRight();
    const animalSpecieTraits = animalSpecieTraitsOrError.getRight();
    const animalStats = animalStatusOrError.getRight();

    const specie = await this.specieRepo.findById(animalSpecieId.toValue());

    if (specie.isLeft()) {
      return left(specie.value);
    }

    const traitsValidation = specie.value.validateArrayOfAnimalTraits(animalSpecieTraits);

    if (traitsValidation.isLeft()) {
      return left(traitsValidation.value);
    }

    const animalResult = Animal.create({
      name: animalName,
      age: animalAge,
      donatorId: animalDonatorId,
      image: animalImage,
      specieId: animalSpecieId,
      animalTrait: traitsValidation.value,
      createdAt: animalCreatedTimespamp,
      status: animalStats
    });

    if (animalResult.isLeft()) {
      return left(animalResult.value);
    }

    const repoResult = await this.animalRepo.save(animalResult.value);

    if (repoResult.isLeft()) {
      return left(repoResult.value);
    }

    return right(animalResult.value);
  }
}
