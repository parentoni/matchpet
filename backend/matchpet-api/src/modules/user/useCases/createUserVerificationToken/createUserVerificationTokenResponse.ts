import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

export type CreateUserVerificationTokenResponse = Either<
  CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue,
  CreateUserVerificationTokenSuccess
>;

export type CreateUserVerificationTokenSuccess = {
  url: string;
  token: string;
};
