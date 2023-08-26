import { Either } from "../../../../shared/core/Result";
import { BaseError, GenericError, success } from "../../../../shared/core/Response/Error";
import { AppError } from "../../../../shared/core/Response/AppError";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { IBaseError } from "../../../../shared/core/Response/Error";
import { User } from "../../domain/user";

export type CreateUserResponse = Either<
  AppError.UnexpectedError | CommonUseCaseResult.InvalidValue | GenericError<IBaseError> | CommonUseCaseResult.Conflict,
  User
>;
