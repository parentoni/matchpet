import { Either } from "../../../../shared/core/Result";
import { BaseError, IBaseError } from "../../../../shared/core/Response/Error";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";

// Returns either error or token
export type LoginResponse = Promise<
  Either<CommonUseCaseResult.Forbidden | CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, string>
>;
