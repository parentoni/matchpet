import { GuardError } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../../shared/core/Result";
import { IAnimalPersistent } from "../../../../../shared/infra/database/models/Animal";
import { Animal } from "../../../domain/Animal";

export type FilterAnimalsUseCaseResponse = Either<
  CommonUseCaseResult.InvalidValue | GuardError | CommonUseCaseResult.UnexpectedError,
  { animals: IAnimalPersistent[]; count: number }
>;
