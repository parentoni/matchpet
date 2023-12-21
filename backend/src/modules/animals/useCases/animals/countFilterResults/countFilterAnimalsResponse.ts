import { GuardError } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../../shared/core/Result";
import { IAnimalPersistent } from "../../../../../shared/infra/database/models/Animal";

export type CountFilterAnimalsUseCaseResponse = Either<
  CommonUseCaseResult.InvalidValue | GuardError | CommonUseCaseResult.UnexpectedError,
  {count: number}
>;
