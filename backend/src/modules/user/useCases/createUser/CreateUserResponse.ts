import { Either } from "../../../../shared/core/Result";
import { GenericError } from "../../../../shared/core/Response/Error";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { IBaseError } from "../../../../shared/core/Response/Error";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";

export type CreateUserResponse = Either<
  CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue | GenericError<IBaseError> | CommonUseCaseResult.Conflict,
  IUserPersistant
>;
