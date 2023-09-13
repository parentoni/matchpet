import { GuardError } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../../shared/core/Result";
import { ISpeciePersistent } from "../../../../../shared/infra/database/models/Specie";

export type FindSpecieByIdResponse = Either<GuardError | CommonUseCaseResult.InvalidValue, ISpeciePersistent>;
