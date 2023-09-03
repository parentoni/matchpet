import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { AnimalModel } from "../../../../shared/infra/database/models/Animal";
import { Animal } from "../../domain/Animal";
import { AnimalMapper } from "../../mappers/AnimalMapper";
import { IAnimalRepo } from "../IAnimalRepo";

export class AnimalRepo implements IAnimalRepo {
  async save(animal: Animal): Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
    const animalPersistent = AnimalMapper.toPersistent(animal);
    if (animalPersistent.isLeft()) {
      return left(animalPersistent.value);
    }
    const exists = await AnimalModel.exists({ _id: animal.id.toValue() });

    if (!!exists) {
      await AnimalModel.findByIdAndUpdate(animal.id.toValue(), animalPersistent.value);
      return right(null);
    }

    await AnimalModel.create(animalPersistent.value);
    return right(null);
  }

  async findById(id: string): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | GuardError, Animal>> {
    try {
      const result = await AnimalModel.findById(id);

      if (!result) {
        return left(
          CommonUseCaseResult.InvalidValue.create({
            location: `${AnimalModel.name}.${this.findById.name}`,
            errorMessage: "There was no animals found with given id.",
            variable: "ID"
          })
        );
      }

      const mapperResult = AnimalMapper.toDomain(result.toObject());
      if (mapperResult.isLeft()) {
        return left(mapperResult.value);
      }

      return right(mapperResult.value);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}
