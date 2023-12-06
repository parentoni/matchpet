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
import { AnimalDescription } from "../domain/animal/AnimalDescription";
import { AnimalImages } from "../domain/animal/AnimalImages";
import { AnimalName } from "../domain/animal/AnimalName";
import { AnimalStatus } from "../domain/animal/AnimalStatus";
import { AnimalTrait } from "../domain/animal/AnimalTrait";
import { AnimalTraits } from "../domain/animal/AnimalTraits";

export class AnimalMapper {
  //!todo: add traits verification
  public static toDomain(persistent: IAnimalPersistent): Either<GuardError, Animal> {
    const animalNameOrError = AnimalName.create({ value: persistent.name });
    const animalImageOrError = AnimalImages.createFromPersistent(persistent.image);
    const animalDonatorIdOrError = UniqueGlobalId.createExisting(persistent.donator_id.toString());
    const animalSpecieIdOrError = UniqueGlobalId.createExisting(persistent.specie_id.toString());
    const animalIdOrError = UniqueGlobalId.createExisting(persistent._id.toString());
    const animalTraitsOrError = AnimalTraits.createFromPersistent(persistent.traits);
    const animalStatsOrError = AnimalStatus.create(persistent.status);
    const animalDescriptionOrError = AnimalDescription.create({ value: persistent.description });
    
    const animalCreatedAt = Timestamp.create(persistent.created_at);
    const animalLastModified = Timestamp.create(persistent.last_modified_at)
    
    const combineResult = EitherUtils.combine([
      animalNameOrError,
      animalImageOrError,
      animalDonatorIdOrError,
      animalSpecieIdOrError,
      animalTraitsOrError,
      animalIdOrError,
      animalTraitsOrError,
      animalDescriptionOrError
    ]);

    if (combineResult.isLeft()) {
      return left(combineResult.value);
    }

    const animalName = animalNameOrError.getRight();
    const animalImage = animalImageOrError.getRight();
    const animalDonatorId = animalDonatorIdOrError.getRight();
    const animalSpecieId = animalSpecieIdOrError.getRight();
    const animalTraits = animalTraitsOrError.getRight();
    const animalId = animalIdOrError.getRight();
    const animalStats = animalStatsOrError.getRight();
    const animalDescription = animalDescriptionOrError.getRight();

    const animal = Animal.create(
      {
        name: animalName,
        image: animalImage,
        donatorId: animalDonatorId,
        specieId: animalSpecieId,
        animalTrait: animalTraits,
        createdAt: animalCreatedAt,
        status: animalStats,
        description: animalDescription,
        lastModifiedAt: animalLastModified
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
      return right({
        _id: domain.id.toValue(),
        name: domain.name.value,
        image: domain.image.persistentValue,
        donator_id: domain.donatorId.toValue(),
        specie_id: domain.specieId.toValue(),
        traits: domain.animalTraits.persistentValue,
        status: domain.animalStatus.value,
        description: domain.description.value,
        created_at: domain.createdAt.value,
        last_modified_at: domain.lastModifiedAt.value
      });
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }

  public static toDomainBulk(persistent: IAnimalPersistent[]):Either<GuardError, Animal[]> {
    const array: Animal[] = []
    for (const animal of persistent) {
      const response = this.toDomain(animal)
      if (response.isLeft()) {
        return left(response.value)
      }

      array.push(response.value)
    }

    return right(array)

  }
}
