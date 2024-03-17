import { GuardError } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../../shared/core/Result";

export type UpdateViewCounterResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>;
