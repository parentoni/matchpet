import { GuardError } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { Timestamp } from "../../../shared/core/Timestamp";
import { ValidUrl } from "../../../shared/core/ValidUrl";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { IAnimalPersistent, IAnimalTraitsPersistent } from "../../../shared/infra/database/models/Animal";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { Animal } from "../domain/Animal";
import { AnimalAge } from "../domain/animal/AnimalAge";
import { AnimalName } from "../domain/animal/AnimalName";
import { AnimalStatus } from "../domain/animal/AnimalStatus";
import { AnimalTrait } from "../domain/animal/AnimalTraits";

export class AnimalMapper {
  public static toDomain(persistent: IAnimalPersistent): Either<GuardError, Animal> {
    const animalNameOrError = AnimalName.create({ value: persistent.name });
    const animalAgeOrError = AnimalAge.create({ months: persistent.age });
    const animalImageOrError = ValidUrl.create({ value: persistent.image });
    const animalCreatedAt = Timestamp.create(persistent.created_at);
    const animalDonatorIdOrError = UniqueGlobalId.createExisting(persistent.donator_id);
    const animalSpecieIdOrError = UniqueGlobalId.createExisting(persistent.specie_id);
    const animalIdOrError = UniqueGlobalId.createExisting(persistent._id);
    const animalTraitsOrError = AnimalTrait.create_bulk(persistent.traits);
    const animalStatsOrError = AnimalStatus.create(persistent.status);
    const combineResult = EitherUtils.combine([
      animalNameOrError,
      animalAgeOrError,
      animalImageOrError,
      animalDonatorIdOrError,
      animalSpecieIdOrError,
      animalTraitsOrError,
      animalIdOrError,
      animalTraitsOrError
    ]);

    if (combineResult.isLeft()) {
      return left(combineResult.value);
    }

    const animalName = animalNameOrError.getRight();
    const animalAge = animalAgeOrError.getRight();
    const animalImage = animalImageOrError.getRight();
    const animalDonatorId = animalDonatorIdOrError.getRight();
    const animalSpecieId = animalSpecieIdOrError.getRight();
    const animalTraits = animalTraitsOrError.getRight();
    const animalId = animalIdOrError.getRight();
    const animalStats = animalStatsOrError.getRight();

    const animal = Animal.create(
      {
        name: animalName,
        age: animalAge,
        image: animalImage,
        donatorId: animalDonatorId,
        specieId: animalSpecieId,
        animalTrait: animalTraits,
        createdAt: animalCreatedAt,
        status: animalStats
      },
      animalId
    );

    if (animal.isLeft()) {
      return left(animal.value);
    }

    return right(animal.value);
  }

  public static toPersistent(domain: Animal): Either<CommonUseCaseResult.UnexpectedError, IAnimalPersistent> {
    try {
      const traitsPersistentArray: IAnimalTraitsPersistent[] = [];

      for (const trait of domain.animalTraits) {
        traitsPersistentArray.push({ _id: trait._id.toValue(), value: trait.value });
      }

      return right({
        _id: domain.id.toValue(),
        name: domain.name.value,
        age: domain.age.value,
        image: domain.image.value,
        donator_id: domain.donatorId.toValue(),
        specie_id: domain.specieId.toValue(),
        created_at: domain.createdAt.value,
        traits: traitsPersistentArray,
        status: domain.animalStatus.value
      });
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
