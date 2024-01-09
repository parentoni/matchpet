import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

export type CreateNewPasswordTokenResponse = Either<
  CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue,
  CreateUserPasswordTokenSuccess
>;

export type CreateUserPasswordTokenSuccess = {
  url: string;
  token: string;
};
