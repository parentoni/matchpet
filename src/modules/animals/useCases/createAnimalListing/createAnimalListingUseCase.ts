import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ValidUrl } from "../../../../shared/core/ValidUrl";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { UserId } from "../../../user/domain/userProps/userId";
import { Animal } from "../../domain/Animal";
import { AnimalAge } from "../../domain/animal/AnimalAge";
import { AnimalName } from "../../domain/animal/AnimalName";
import { AnimalTrait } from "../../domain/animal/AnimalTraits";
import { ISpecieRepo } from "../../repository/ISpeciesRepo";
import { CreateAnimalListingDTO } from "./createAnimalListingDTO";
import { CreateAnimalListingResponse } from "./createAnimalListingResponse";

export class CreateAnimalListingUseCase implements UseCase<CreateAnimalListingDTO, CreateAnimalListingResponse> {
  private specieRepo: ISpecieRepo;
  constructor (specieRepo: ISpecieRepo) {
    this.specieRepo = specieRepo
  }
  
  async execute(request: CreateAnimalListingDTO): Promise<CreateAnimalListingResponse> {

    const animalNameOrError = AnimalName.create({ value: request.name });
    const animalAgeOrError = AnimalAge.create({ months: request.age });
    const animalImageOrError = ValidUrl.create({ value: request.image_url });

    const animalDonatorIdOError = UniqueGlobalId.createExisting(request.donatorId);
    const animalSpecieIdOrError = UniqueGlobalId.createExisting(request.specie_id);

    const combineResult = EitherUtils.combine([
      animalNameOrError,
      animalAgeOrError,
      animalImageOrError,
      animalSpecieIdOrError,
      animalDonatorIdOError
    ]);

    if (combineResult.isLeft()) {
      return left(combineResult.value);
    }

    const animalName = animalNameOrError.getRight();
    const animalAge = animalAgeOrError.getRight();
    const animalImage = animalImageOrError.getRight();
    const animalSpecieId = animalSpecieIdOrError.getRight();
    const animalDonatorId = animalDonatorIdOError.getRight();

    const specie = await this.specieRepo.findById(animalSpecieId.toValue())

    if (specie.isLeft()) {
      return left(specie.value)
    }


    const animalResult = Animal.create({
      name: animalName,
      age: animalAge,
      donatorId: animalDonatorId,
      image: animalImage,
      specieId: animalSpecieId
    });

    if (animalResult.isLeft()) {
      return left(animalResult.value);
    }

    return right(animalResult.value);
  }
}
