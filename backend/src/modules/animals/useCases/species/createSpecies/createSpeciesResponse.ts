import { GuardError } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../../shared/core/Result";
import { ISpeciePersistent } from "../../../../../shared/infra/database/models/Specie";
import { Specie } from "../../../domain/Specie";

export type CreateSpeciesResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, ISpeciePersistent>;
