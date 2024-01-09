import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../../shared/core/Result";

export type UpdateClickedCounterResponse = Either<CommonUseCaseResult.UnexpectedError, null>;
