import { GuardError, GuardResponse } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either } from "../../../shared/core/Result";
import { Animal } from "../domain/Animal";
import { FilterObject } from "../useCases/filterAnimals/filterAnimalsDTO";

export interface IAnimalRepo {
  save(animal: Animal): Promise<Either<CommonUseCaseResult.UnexpectedError, null>>;
  findById(id: string): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | GuardError, Animal>>;
  findSimilar(
    excludeId: string,
    specieId: string,
    searchValue: string[]
  ): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, Animal[]>>;
  findBulk(filter: FilterObject[], skip: number, limit: number): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, Animal[]>>;
}
