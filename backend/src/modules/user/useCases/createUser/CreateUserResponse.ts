import { Either } from "../../../../shared/core/Result";
import { BaseError, GenericError, success } from "../../../../shared/core/Response/Error";
import { AppError } from "../../../../shared/core/Response/AppError";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { IBaseError } from "../../../../shared/core/Response/Error";
import { User } from "../../domain/user";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";

export type CreateUserResponse = Either<
  CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue | GenericError<IBaseError> | CommonUseCaseResult.Conflict,
  IUserPersistant
>;
