import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

export type VerifyUserResponse = Either<
  CommonUseCaseResult.Forbidden | CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError,
  { token: string }
>;
