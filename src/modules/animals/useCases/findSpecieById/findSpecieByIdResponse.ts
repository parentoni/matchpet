import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { Specie } from "../../domain/Specie";

export type FindSpecieByIdResponse = Either<GuardError | CommonUseCaseResult.InvalidValue, Specie>;
