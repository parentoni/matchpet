import { GuardError } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either } from "../../../shared/core/Result";
import { Animal } from "../domain/Animal";

export interface IAnimalRepo {
  save(animal: Animal): Promise<Either<CommonUseCaseResult.UnexpectedError, null>>;
  findById(id: string): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | GuardError, Animal>>;
}
