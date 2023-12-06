import { GuardError } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either } from "../../../shared/core/Result";
import { ISpeciePersistent } from "../../../shared/infra/database/models/Specie";
import { Specie } from "../domain/Specie";

export interface ISpecieRepo {
  save(specie: Specie): Promise<Either<CommonUseCaseResult.UnexpectedError, null>>;
  all(): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, Specie[]>>;
  findById(id: string): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | GuardError, Specie>>;
}
